const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BandSchema = new Schema({
    bandName: {
        type: String,
        required: true,
    },
    bandMembers: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        },
        { role: { type: String } }
    ],
    bandOwner: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    allowNewMembers: {
        type: Boolean,
        default: true
    }
})

module.exports = Band = mongoose.model("Band", BandSchema);