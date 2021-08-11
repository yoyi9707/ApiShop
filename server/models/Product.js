const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        weigth: { type: Number, required: true },
        picture: { type: String},
        kind: { type: String, required: true },
        subCategory: { type: String, required: true },
        active: { type: Boolean, required: true },
        storeActive: { type: Boolean, required: true },
        storeAvailability: { type: Number, required: true },
        description: { type: String },
        promotion: { type: Number }
    },
    {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('Product', ProductSchema);

