const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
    instrument: {
        type: String
    }
})

const Instrument = module.exports = mongoose.model("Instrument", InstrumentSchema);