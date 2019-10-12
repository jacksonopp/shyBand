const db = require("../models")
const jwtDecode = require("jwt-decode");


module.exports = function (app) {
    app.put("/api/currentUser", (req, res) => {
        const token = req.body.localStorage.jwtToken.substr(7);
        const decoded = jwtDecode(token);
        const userID = decoded.id;
        // console.log(userID);
        db.User.findById(userID).exec((err, data) => {
            res.json(data);
        })
    })
    app.get("/api/user/:token", (req, res) => {
        const token = req.params.token;
        const decoded = jwtDecode(token);
        const userID = decoded.id;
        console.log("token:", token);
        console.log("decoded:", decoded);
        console.log("UID:", userID);
        db.User.findById(userID).exec((err, data) => {
            err ? res.json(err) : res.json(data);
        })
    })
}