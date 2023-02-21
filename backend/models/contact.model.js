const mongoose = require("mongoose");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    userId: { type: String, required: true },
    rate: {type: Number, default: 0},
    questionLong: { type: String},
    questionRajouter:{ type: String},
    idee:{ type: String},
    creationDate: { type: Date, required: true },
  })
);

module.exports = Contact;
