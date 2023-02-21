const mongoose = require("mongoose");
const config = require("../config/auth");
const { v4: uuidv4 } = require('uuid');

const RefreshTokenSchema = new mongoose.Schema({
    token: String,
    user: {
        id: String
    },
    expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async function (id) {
    let expiredAt = new Date();

    expiredAt.setSeconds(
        expiredAt.getSeconds() + config.jwtRefreshExpiration
    );

    let _token = uuidv4();

    let _object = new this({
        token: _token,
        user: { id: id },
        expiryDate: expiredAt.getTime(),
    });

    console.log(_object);

    let refreshToken = await _object.save();

    return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
}

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;
