const mongoose = require("mongoose");

const Resolution = mongoose.model(
  "Resolution",
  new mongoose.Schema({
    userId: { type: String, required: true },
    label: { type: String, required: true},
    creationDate: { type: Date, required: true },
    state: { type: Boolean, default: false },   
  })
);

module.exports = Resolution;
