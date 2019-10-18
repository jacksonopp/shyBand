const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    role: {
        type: String,
        default: "default"
    }
})

const JoinSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    role: {
        type: String,
        default: "default"
    }
})

const BandSchema = new Schema({
    bandName: {
        type: String,
        required: true,
    },
    bandMembers: [MemberSchema],
    joinMembers: [JoinSchema],
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