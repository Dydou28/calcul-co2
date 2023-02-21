const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    last_name: String,
    first_name: String,
    password: String,
    updateAt: String,
    emailVerified: { type: Boolean, default: false },
    authReq: { 
      nb: { type: Number, default: 0 },
      update: Number,
    },
  })
);

module.exports = User;
