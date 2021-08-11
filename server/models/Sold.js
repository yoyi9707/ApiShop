const mongoose = require('mongoose');
const { Schema } = mongoose;

const SoldSchema = new Schema(
    {
        userId: {
            ref: "User",
            type: Schema.Types.ObjectId
        },
        products: [{
            ref: "Product",
            type: Schema.Types.ObjectId
        }],
        quantity: [{ type: Number, required: true }],
        unitprice: [{ type: Number, required: true }],
        order: { type: Number, required: true },
        year: { type: Number, required: true },
        condition: { type: String, required: true },
        
    },
    {
        versionKey: false,
        timestamps: true
    });

   

module.exports = mongoose.model('Sold', SoldSchema);

