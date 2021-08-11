const Sold = require('../models/Sold');

const soldCtrl = {};

soldCtrl.getSold = async (req, res) => {
    const sol = await Sold.find();
    res.json(sol);
}

soldCtrl.getSoldPaginated = async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
    const sol = await Sold.find({})
        .skip((perPage * (page - 1)))
        .limit(perPage);
    const total = await Sold.count();
    const pages = Math.ceil(total / perPage);
    res.json({ sol, pages, current: page });
}

soldCtrl.getSoldPaginatedbyUser = async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
    const userid = req.query.userid;

    const sol = await Sold.find({ userId: userid })
        .skip((perPage * (page - 1)))
        .limit(perPage);
    const total = await Sold.find({ userId: userid });
    const pages = Math.ceil(total.length / perPage);
    res.json({ sol, pages, current: page, total: total.length });
}

soldCtrl.getSoldByYearOrder = async (req, res) => {
    let orderf = req.params.order;
    const yearf = req.query.year;
    const sol = await Sold.findOne({ order: orderf, year: yearf }).populate("products");
    res.json({ sol });
}

soldCtrl.createSold = async (req, res) => {
    const user = req.body.user;
    const products = req.body.products;
    const order = await Sold.count() + 1;
    const sol = new Sold();
    sol.order = order;
    sol.condition = "En Proceso";
    sol.userId = user;
    var today = new Date();
    sol.year = today.getFullYear();
    for (let i = 0; i < products.length; i++) {
        sol.quantity.push(products[i][1]);
        sol.products.push(products[i][0]._id);
        sol.unitprice.push(products[i][2]);
    }
    await sol.save(
        (error, docs) => {
            if (error) {
                res.send({ items: 'Error' })
            }
        });

    res.json({
        order: order
    });

};



module.exports = soldCtrl;