const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        CI: { type: Number, required: true, unique: true },
        firstLastname: { type: String, required: true },
        secondLastname: { type: String},
        password: { type: String, required: true },
        active: { type: Boolean, required: true },
        roles: [{
            ref: "Role",
            type: Schema.Types.ObjectId
        }]
        
    },
    {
        versionKey: false,
        timestamps: true
    });

    UserSchema.statics.encryptPassword = async (password) => {
      const salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
    }

    UserSchema.statics.comparePassword = async (password, receivedPassword) => {
       return await bcrypt.compare(password, receivedPassword)
    }

module.exports = mongoose.model('User', UserSchema);

