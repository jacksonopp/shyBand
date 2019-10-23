const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  instruments: [{
    type: Schema.Types.ObjectId,
    ref: "Instrument"
  }],
  username: {
    type: String,
    default: "not filled out yet"
  },
  favoriteBands:
    [{
      type: Schema.Types.ObjectId,
      ref: "FavoriteBand"
    }],
  experience: {
    type: Number
  },
  genre: [{
    type: Schema.Types.ObjectId,
    ref: "Genre"
  }],
  location: {
    type: String
  },
  thread: [{
    type: Schema.Types.ObjectId,
    ref: "Thread"
  }],
  bands: [
    {
      type: Schema.Types.ObjectId,
      ref: "Band"
    }
  ],
  profilePic: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
});

module.exports = User = mongoose.model("users", UserSchema);
