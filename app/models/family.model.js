const mongoose = require("mongoose");

const Family = mongoose.model(
    "Family",
    new mongoose.Schema({
        name: String,
        description: String
    })
);

module.exports = Family;
