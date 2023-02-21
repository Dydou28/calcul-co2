const mongoose = require("mongoose");
var Crypto = require("crypto");

const PassTokenSchema = new mongoose.Schema({
    token: String,
    userId: String,
    expiryDate: Date,
    nbRequest: { type: Number, default: 0 },
});

PassTokenSchema.statics.createToken = async function (id) {
    let expiredAt = new Date();

    expiredAt.setSeconds(
        expiredAt.getSeconds() + 3600
    );

    let _token = Crypto.randomBytes(8).toString("hex");

    let _object = new this({
        token: _token,
        userId: id,
        expiryDate: expiredAt.getTime(),
    });

    console.log(_object);

    let Pass = await _object.save();

    return Pass.token;
};

PassTokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
}

const PassToken = mongoose.model("PassToken", PassTokenSchema);

module.exports = PassToken;