import { Schema, model, Types } from "mongoose"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avator: {
        type: String,
    },
    coverimage: {
        type: String,
        required: true,
    },
    watchhistory: {
        type: [{
            type: Types.ObjectId,
            ref: "video"
        }]
    },
    password: {
        type: String,
        required: true,
    },
    refreshtoken: {
        type: String,

    },
}, {
    timestamps: true
})

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        var salt = bcryptjs.genSaltSync(10);

        var hash = bcryptjs.hashSync(this.password, salt);
        this.password = hash
    }

    next()
})
UserSchema.methods.isPasswordCorrect = function () {
    return bcryptjs.compareSync(this.password, hash);
}
UserSchema.methods.refreshTokenGenerate = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, process.env.ACCESS_tOKEN_SECRET, {
        expiresIn: process.env.ACCESS_tOKEN_EXPIRY
    })
}
UserSchema.methods.accesstokenGenerate = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, process.env.REFRESH_tOKEN_SECRET, {
        expiresIn: process.env.REFRESH_tOKEN_EXPIRY
    })
}
const user = model("User", UserSchema)
export default user;