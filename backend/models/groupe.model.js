const mongoose = require("mongoose");

const Groupe = mongoose.model(
  "Groupe",
  new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // users:[{ type: String, required: true}],
    name: { type: String, required: true},
    creationDate: { type: Date, required: true },
  })
);

module.exports = Groupe;
