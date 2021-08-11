const mongoose = require('mongoose');
const { Schema } = mongoose;

const NomenclatorSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        acronym: { type: String},
        active: { type: Boolean, required: true },
        description: { type: String},
        fatherid: { type: String},
        fathername: { type: String},
        order: { type: Number}
    },
    {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('Nomenclator', NomenclatorSchema);

