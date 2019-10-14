const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
})

module.exports = Thread = mongoose.model("Thread", ThreadSchema);