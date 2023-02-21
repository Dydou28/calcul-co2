const User = require("../models/users.model");

getUser = async function (query) {
    if (query !== null) {
        const user = await User.findOne(query).exec();
        return user;
    } else return null;
};

updateUser = async function (userId, user) {
    const res = await User.updateOne({ _id: userId }, { $set: user }).exec();
    return res;
};

checkDuplicUsername = async function (username) {
    return new Promise(resultat => User.findOne({ username: username }).exec((err, user) => {
        if (user) {
            resultat(true);
        } else resultat(false);
    }))
};

checkDuplicEmail = async function (email) {
    return new Promise(resultat => User.findOne({ email: email }).exec((err, user) => {
        if (user) {
            resultat(true);
        } else resultat(false);
    }))
};

const utilsUser = {
    getUser,
    updateUser,
    checkDuplicEmail,
    checkDuplicUsername,
};
module.exports = utilsUser;