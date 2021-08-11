const User = require('../models/User');
const Role = require('../models/Role');

const userCtrl = {};

userCtrl.getUser = async (req, res) => {
    const user = await User.find().populate("roles");
    console.log(user);
    res.json(user);
}


userCtrl.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id, { password: 0 }, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        }
    });
    res.json(user);

}

userCtrl.updateUserByUsername = async (req, res) => {
    const u = req.body.username
    const p = req.body.pass

    let user = await User.findOne({ username: u }, (error, docs) => {
        if (error) {
            res.send({ items: 'Error-finding' })
        }
    });

    const pass = await User.encryptPassword(p);
    user.password = pass;
    console.log(user)
    console.log(user.password)

    await User.updateOne(
        { _id: user._id },
        user,
        (err, docs) => {
            if (err) {
                res.send({ items: 'Error-updating' })
            }
        }
    )
    res.json({ status: 'Contraseña Actualizada.' });

}

userCtrl.editUser = async (req, res) => {

    const { id } = req.params
    const body = req.body

    if (req.body.roles) {
        const foundRoles = await Role.find({ name: { $in: req.body.roles } })
        body.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ name: "Usuario" })
        body.roles = [role._id];
    }

    await User.updateOne(
        { _id: id },
        body,
        (err, docs) => {
            if (err) {
                res.send({ items: 'Error' })
            }
        }
    )

    res.json({ status: 'User actualizado' });
}


userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        };
    });
    res.json({ status: 'User eliminado' });
}

userCtrl.getUserPaginated = async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
    const user = await User.find()
        .skip((perPage * (page - 1)))
        .limit(perPage)
        .populate("roles");
    const total = await User.count();
    const pages = Math.ceil(total / perPage);
    res.json({ user, pages, current: page });
}


module.exports = userCtrl;