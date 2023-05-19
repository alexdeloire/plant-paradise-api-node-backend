const mongoose = require("mongoose");

const Biotope = mongoose.model(
  "Biotope",
  new mongoose.Schema({
    name: String,
    description: String
  })
);

module.exports = Biotope;
