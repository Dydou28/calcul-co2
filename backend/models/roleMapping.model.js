const mongoose = require("mongoose");

const RoleMapping = mongoose.model(
  "RoleMapping",
  new mongoose.Schema({
    userId: String,
    roleId: String,
    role: String,
  })
);

module.exports = RoleMapping;