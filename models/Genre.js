const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    genre: {
        type: String
    }
})

const Genres = module.exports = mongoose.model("Genre", GenreSchema);