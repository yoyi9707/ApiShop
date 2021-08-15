const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Role = require('../models/Role');

const authCtrl = {};

authCtrl.signUp = async (req, res) => {
    var user = new User(req.body);

    // validar que no exista el usuario en BD
    if (await User.findOne({ CI: user.CI })) {
        return res.status(401).json({ token: null, message: "Ya existe un usuario con ese CI" })
    }
    if (await User.findOne({ username: user.username })) {
        return res.status(401).json({ token: null, message: "Ya existe un usuario con ese User Name" })
    }
    if (await User.findOne({ email: user.email })) {
        return res.status(401).json({ token: null, message: "Ya existe un usuario con ese Email" })
    }

    const pass = await User.encryptPassword(user.password);
    user.password = pass;

    if (req.body.roles) {
        const foundRoles = await Role.find({ name: { $in: req.body.roles } })
        user.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ name: "Usuario" })
        user.roles = [role._id];
    }

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id }, config.SECRET.toString(), {
        expiresIn: 86400 //24 horas
    })
    res.json({ token });
}

authCtrl.signIn = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json({ token: null, message: "Faltan datos" })
    }

    const userfound = await User.findOne({ username: req.body.username }).populate("roles")

    if (!userfound) return res.status(400).json({ message: "Usuario no encontrado." })

    if (!userfound.active) return res.status(400).json({ message: "Usuario no activo." })

    const matchPassword = await User.comparePassword(req.body.password, userfound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: "Contraseña incorrecta." })

    const token = jwt.sign({ id: userfound._id }, config.SECRET.toString(), {
        expiresIn: 86400 //24 horas
    })
    res.json({ token });
}

authCtrl.check = async (req, res) => {
    try {
        const token = req.body.token;

        if (!token) return res.status(403).json({ message: "No se envió un token." })
        const decoded = jwt.verify(token, config.SECRET.toString())
        const user = await User.findById(decoded.id, { password: 0 })
        if (!user) return res.status(404).json({ message: "No se encontró el ususario." })

        return res.json({ valid: true })

    } catch (error) {
        return res.status(401).json({ message: "No autorizado." })
    }
}

authCtrl.findUser = async (req, res) => {
    try {

        const token = req.body.token;

        if (!token) return res.status(403).json({ message: "No se envió un token." })
        const decoded = jwt.verify(token, config.SECRET.toString())
        const user = await User.findById(decoded.id, { password: 0 }).populate("roles")
        if (!user) return res.status(404).json({ message: "No se encontró el ususario." })

        return res.json(user)

    } catch (error) {
        return res.status(401).json({ message: "No autorizado." })
    }
}

module.exports = authCtrl;