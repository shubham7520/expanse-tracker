import mongoose from "mongoose";
import validator from "validator";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validator: validator.isEmail

    },
    password: {
        type: String,
        require: true,
        select: false
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.getJWTToken = function () {
    return Jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE_TIME });
}

userSchema.methods.comparePassword = async function (enterPassword) {
    return bcrypt.compare(enterPassword, this.password);
}

const user = mongoose.model('user', userSchema);

export default user;