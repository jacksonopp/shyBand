const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: {
        type: String
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

module.exports = mongoose.model("Message", MessageSchema);