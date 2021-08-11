const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema(
    {
        name: { type: String, required: true, unique: true},
    },
    {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('Role', RoleSchema);

