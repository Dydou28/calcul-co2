const mongoose = require('mongoose');

const IndiceSource = mongoose.model(
  "IndiceSource",
  new mongoose.Schema({
    category: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    unity: { type: String, required: true },
    form_name: { type: String, required: false },
    masse: { type: Number, required: true },
    temps: { type: Number, required: false },
    source_link: { type: String, required: false }
  })
);

module.exports = IndiceSource;