const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FavoriteBandSchema = new Schema({
    bandName: {
        type: String
    }
})

const FavoriteBand = module.exports = mongoose.model("FavoriteBand", FavoriteBandSchema);