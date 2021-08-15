const User = require('../models/User');
const Role = require('../models/Role');
const Nom = require('../models/Nomenclator');

const startup = {}

startup.init = async (req, res, next) => {
    console.log('here!!')
    try {
        //Creando datos básicos en BD(ROL, USER, NOMENCLADORES)
        const roles = await Role.countDocuments();
        console.log(roles);
        if (roles < 1) {
            console.log('NO ROLES!!')
            //ROLE
            const role = new Role({
                "name": "Super Administrador"
            });

            await role.save(
                (error, docs) => {
                    if (error) {
                        res.send({ items: 'Error' })
                    }
                });

            //USER
            var userSA = new User({
                "username": "SA",
                "email": "yoyi1239707@gmail.com",
                "name": "Jorge",
                "CI": 97070407706,
                "firstLastname": "Alonso",
                "secondLastname": "Podadera",
                "password": "Qwerty2021*",
                "active": true
            });
            const pass = await User.encryptPassword(userSA.password);
            userSA.password = pass;

            const roleSA = await Role.findOne({ name: "Super Administrador" })
            userSA.roles = [roleSA._id];

            await userSA.save(
                (error, docs) => {
                    if (error) {
                        console.log(error)
                    }
                });

            //NOMENCLATORS
            const nomC = new Nom({
                "name": "Categoría",
                "active": true,
                "order": 0
            });
            const c = await Nom.findOne({ name: nomC.name });
            if ( c == null ) {
                await nomC.save(
                    (error, docs) => {
                        if (error) {
                            console.log(error)
                        }
                        console.log(docs)
                    });
            }
            const father = await Nom.findOne({ name: "Categoría" });

            const nomR = new Nom({
                "name": "Ropa",
                "active": true,
                "order": 1,
                "fatherid": "",
                "fathername": "Categoría"
            });
            nomR.fatherid = father._id;
            const r = await Nom.findOne({ name: nomR.name });
            if ( r == null ) {
                await nomR.save(
                    (error, docs) => {
                        if (error) {
                            console.log(error)
                        }
                    });
            }

            const nomM = new Nom({
                "name": "Muebles",
                "active": true,
                "order": 1,
                "fatherid": "",
                "fathername": "Categoría"
            });
            nomM.fatherid = father._id;
            const m = await Nom.findOne({ name: nomM.name });
            if ( m == null ) {
                await nomM.save(
                    (error, docs) => {
                        if (error) {
                            console.log(error)
                        }
                    });
            }

            const nomT = new Nom({
                "name": "Tecnología",
                "active": true,
                "order": 1,
                "fatherid": "",
                "fathername": "Categoría"
            });
            nomT.fatherid = father._id;
            const t = await Nom.findOne({ name: nomT.name });
            if ( t == null ) {
                await nomT.save(
                    (error, docs) => {
                        if (error) {
                            console.log(error)
                        }
                    });
            }

            const nomCo = new Nom({
                "name": "Comida",
                "active": true,
                "order": 1,
                "fatherid": "",
                "fathername": "Categoría"
            });
            nomCo.fatherid = father._id;
            const co = await Nom.findOne({ name: nomCo.name });
            if ( co == null ) {
                await nomCo.save(
                    (error, docs) => {
                        if (error) {
                            console.log(error)
                        }
                    });
            }
        }
        next()
    } catch (error) {
        return res.status(401).json({ message: error })
    }
}





module.exports = startup;