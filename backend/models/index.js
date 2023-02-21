const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./users.model");
db.refreshToken = require("./refreshToken.model");
db.balanceIndividual = require("./balanceIndividual.model");
db.indiceSource = require("./indiceSource.model");
db.emailToken = require("./emailToken.model");
db.passToken = require("./passToken.model");
db.role = require("./role.model");
db.roleMapping = require("./roleMapping.model");
db.resolution = require("./resolution.model");
db.groupe = require("./groupe.model");

module.exports = db;