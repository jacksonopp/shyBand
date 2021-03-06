require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/mongoose");



// Passport middleware
app.use(passport.initialize());
require("./routes/apiRoutes.js")(app);

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const router = express.Router();

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
