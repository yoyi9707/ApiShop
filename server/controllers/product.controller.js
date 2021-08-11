const Product = require('../models/Product');
const path = require('path');
const fs = require('fs-extra');
const moment = require('moment');


const productCtrl = {};

productCtrl.getProducts = async (req, res) => {
    const product = await Product.find();
    res.json(product);
}

productCtrl.getProductsPaginated = async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
    const product = await Product.find()
        .skip((perPage * (page - 1)))
        .limit(perPage);
    const total = await Product.count();
    const pages = Math.ceil(total / perPage);
    res.json({ product, pages, current: page });
}

productCtrl.createProduct = async (req, res) => {
    const product = new Product(req.body);
    
    product.picture = req.file.path;
    if (await Product.findOne({ code: product.code })) {
        return res.status(401).json({ message: "Ya existe un producto con ese código" })
    }

    await product.save(
        (error, docs) => {
            if (error) {
                res.send({ items: 'Error' })
            }
        });

    res.json({
        status: 'Producto guardado'
    });

};

productCtrl.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        }
    });
    res.json(product);

}

productCtrl.editProduct = async (req, res) => {

    const { id } = req.params
    const body = req.body
    await Product.updateOne(
        { _id: id },
        body,
        (err, docs) => {
            if (err) {
                res.send({ items: 'Error' })
            }
        }
    )

    res.json({ status: 'Producto actualizado' });
}

productCtrl.editProductImg = async (req, res) => {

    const product = await Product.findById(req.params.id);
    if (product.picture) {
        await fs.unlink(path.resolve(product.picture));
    }

    const { id } = req.params
    const body = req.body
    body.picture = req.file.path;
    console.log(body);
    await Product.updateOne(
        { _id: id },
        body,
        (err, docs) => {
            if (err) {
                res.send({ items: 'Error' })
            }
        }
    )

    res.json({ status: 'Producto actualizado' });
}


productCtrl.deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product.picture) {
        await fs.unlink(path.resolve(product.picture));
    }
    await Product.findByIdAndRemove(req.params.id, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        };
    });
    res.json({ status: 'Producto eliminado' });
}

productCtrl.createImg = async (req, res) => {

    res.json({ path: req.file.path });
}

productCtrl.getImg = async (req, res) => {

    res.json({ message: "imagen" });
}

productCtrl.getProductsBySubCategory = async (req, res) => {

    let perPage = 9;
    let page = req.params.page || 1;
    const subcate = req.query.cate;
    const product = await Product.find({ subCategory: subcate, storeAvailability: {$gt: 0}, storeActive: true })
        .skip((perPage * (page - 1)))
        .limit(perPage);
    const t = await Product.find({ subCategory: subcate, storeAvailability: {$gt: 0}, storeActive: true });
    const total = t.length;
    const pages = Math.ceil(total / perPage);
    res.json({ product, pages, current: page });

}

productCtrl.getProductsByCategory = async (req, res) => {

    let perPage = 9;
    let page = req.params.page || 1;
    const cate = req.query.cate;
    const product = await Product.find({ kind: cate, storeAvailability: {$gt: 0}, storeActive: true })
        .skip((perPage * (page - 1)))
        .limit(perPage);
    const t = await Product.find({ kind: cate, storeAvailability: {$gt: 0}, storeActive: true });
    const total = t.length;
    const pages = Math.ceil(total / perPage);
    res.json({ product, pages, current: page });

}

productCtrl.getCantCategory = async (req, res) => {

   
    const Ropa = await Product.find({ kind: 'Ropa', storeAvailability: {$gt: 0}, storeActive: true });
    const Muebles = await Product.find({ kind: 'Muebles', storeAvailability: {$gt: 0}, storeActive: true });
    const Tecnolo = await Product.find({ kind: 'Tecnología', storeAvailability: {$gt: 0}, storeActive: true });
    const Comida = await Product.find({ kind: 'Comida', storeAvailability: {$gt: 0}, storeActive: true });
    const RopaT = Ropa.length;
    const MueblesT = Muebles.length;
    const TecnoloT = Tecnolo.length;
    const ComidaT = Comida.length;
    res.json({ RopaT, MueblesT, TecnoloT, ComidaT });

}

productCtrl.getProductsAvailable = async (req, res) => {

    let perPage = 9;
    let page = req.params.page || 1;
    const product = await Product.find({ storeAvailability: {$gt: 0}, storeActive: true })
        .skip((perPage * (page - 1)))
        .limit(perPage);
        const t = await Product.find({ storeAvailability: {$gt: 0}, storeActive: true });
        const total = t.length;
    const pages = Math.ceil(total / perPage);
    res.json({ product, pages, current: page });

}

productCtrl.getProductsAvailableNew = async (req, res) => {

    var date = moment().subtract(30, 'days').toDate()
    let perPage = 9;
    let page = req.params.page || 1;
    const product = await Product.find({ storeAvailability: {$gt: 0}, storeActive: true,
        $or: [ { updatedAt: { $gt: date } }, { createdAt: { $gt: date } },]
    })
        .skip((perPage * (page - 1)))
        .limit(perPage);
        const t = await Product.find({ storeAvailability: {$gt: 0}, storeActive: true,
            createdAt: { $gt: date } });
        const total = t.length;
    const pages = Math.ceil(total / perPage);
    res.json({ product, pages, current: page });

}

productCtrl.paginatedAvailablePromotion = async (req, res) => {

    let perPage = 9;
    let page = req.params.page || 1;
    const product = await Product.find({ storeAvailability: {$gt: 0}, storeActive: true, promotion: {$gt: 0}})
        .skip((perPage * (page - 1)))
        .limit(perPage);
        const t = await Product.find({ storeAvailability: {$gt: 0}, storeActive: true, promotion: {$gt: 0}});
        const total = t.length;
    const pages = Math.ceil(total / perPage);
    res.json({ product, pages, current: page });

}

productCtrl.getProductsAvailableSearch = async (req, res) => {

    let perPage = 9;
    let page = req.params.page || 1;
    const search = req.query.search;
    const paramet = '.*' + search;
    const product = await Product.find({ 
                                        storeAvailability: {$gt: 0}, 
                                        storeActive: true,
                                        "name": {$regex:paramet, $options:"i"}
                                    })
        .skip((perPage * (page - 1)))
        .limit(perPage);
        const t = await Product.find({ storeAvailability: {$gt: 0}, storeActive: true, "name": {$regex:paramet, $options:"i"}});
        const total = t.length;
        console.log(search)
    const pages = Math.ceil(total / perPage);
    res.json({ product, pages, current: page });

}

productCtrl.getProductsInStore = async (req, res) => {

    let perPage = 9;
    let page = req.params.page || 1;
    const product = await Product.find({ storeAvailability: {$gt: 0} })
        .skip((perPage * (page - 1)))
        .limit(perPage);
        const t = await Product.find({ storeAvailability: {$gt: 0} });
        const total = t.length;
    const pages = Math.ceil(total / perPage);
    res.json({ product, pages, current: page });

}

productCtrl.getAvailableProve = async (req, res) => {

    let perPage = 9;
    let page = req.params.page || 1;
    const product = await Product.find({ active: true })
        .skip((perPage * (page - 1)))
        .limit(perPage);
        const t = await Product.find({ active: true });
        const total = t.length;
    const pages = Math.ceil(total / perPage);
    res.json({ product, pages, current: page });

}





module.exports = productCtrl;