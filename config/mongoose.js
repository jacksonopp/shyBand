const mongoose = require("mongoose");
const database = "shyBand" //database name

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${database}`

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

module.exports = db;