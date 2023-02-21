const mongoose = require("mongoose");
var Crypto = require("crypto");

const EmailTokenSchema = new mongoose.Schema({
    token: String,
    userId: String,
    expiryDate: Date,
    nbRequest: { type: Number, default: 0 },
});

EmailTokenSchema.statics.createToken = async function (id) {
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

    let Email = await _object.save();

    return Email.token;
};

EmailTokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
}

const EmailToken = mongoose.model("EmailToken", EmailTokenSchema);

module.exports = EmailToken;