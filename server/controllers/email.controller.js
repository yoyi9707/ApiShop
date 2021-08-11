const User = require('../models/User');
var nodemailer = require('nodemailer');

const emailCtrl = {};

emailCtrl.sendEmail = async (req, res) => {
    console.log(req.body.username + ' <--username');
    if (!req.body.username) {
        res.status(401).json({ message: "Faltan datos" })
    }
    const userfound = await User.findOne({ username: req.body.username })

    if (!userfound) return res.status(400).json({ message: "Usuario no encontrado." })

    if (!userfound.active) return res.status(400).json({ message: "Usuario no activo." })

    var code = Math.round(Math.random()*999999);

    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'angularnodetienda@gmail.com',
            pass: 'Qweasd123*'
        }
    });

    console.log(userfound.email)
    // Definimos el email
    var mailOptions = {
        from: 'Remitente',
        to: userfound.email,
        subject: 'Asunto',
        text: 'Código autogenerado --> ' + code
    };

    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500, error.message);
        } else {
            console.log("Email sent");
            res.status(200).json({code: code});
        }
    });

    // res.json({
    //     status: 'Email enviado'
    // });

};

module.exports = emailCtrl;