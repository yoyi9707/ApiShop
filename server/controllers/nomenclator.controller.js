const Nom = require('../models/Nomenclator');

const nomenclatorCtrl = {};

nomenclatorCtrl.getNomenclators = async (req, res) => {
    const nom = await Nom.find();
    res.json(nom);
}

nomenclatorCtrl.getCategory = async (req, res) => {
    const nom = await Nom.findOne({name: req.body.name});

    const category = await Nom.find({fatherid: nom._id});
    res.json(category);
}

nomenclatorCtrl.getNomPaginated = async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
    const nomenclator = await Nom.find({})
                                 .skip((perPage * (page - 1)))
                                 .limit(perPage);
    const total = await Nom.count();
    const pages = Math.ceil(total / perPage);
    res.json({nomenclator, pages, current: page });
}

nomenclatorCtrl.createNom = async (req, res) => {
   const nom = new Nom(req.body);
   
   if(await Nom.findOne({name: nom.name})){
    return res.status(401).json({message: "Ya existe un nomenclador con ese nombre"})
}
   
   await nom.save(
    (error, docs) => {
        if(error){
            res.send({items: 'Error'})
        }
    });

   res.json({
    status: 'Nomenclador guardado'
    });
 
};

nomenclatorCtrl.getNomById = async (req, res) => {
    const nom = await Nom.findById(req.params.id, (error, docs) => {
        if(error){
            res.send({items: 'Error'})
        }
    });
    res.json(nom);

}

nomenclatorCtrl.editNom = async (req, res) => {
  
    const { id } = req.params
    const body = req.body
    await Nom.updateOne(
        { _id: id },
        body,
        (err, docs) => {
            if(err){
                res.send({items: 'Error'})
            }
        }
    )

      res.json({status: 'Nomenclador actualizado'});
}


nomenclatorCtrl.deleteNom = async (req, res) =>{
    await Nom.findByIdAndRemove(req.params.id, (error, docs) => {
        if(error){
            res.send({items: 'Error'})
        };
    });
    res.json({status: 'Nom eliminado'});
}


module.exports = nomenclatorCtrl;