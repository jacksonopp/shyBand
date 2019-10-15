const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
})

module.exports = Thread = mongoose.model("Thread", ThreadSchema);