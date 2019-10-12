const db = require("../models")
const jwtDecode = require("jwt-decode");


module.exports = function (app) {
    //get all users
    app.get("/api/users/all/:token", (req, res) => {
        userID = decodeUserID(req.params.token);
        db.User.find({ _id: { $ne: userID } }).exec((err, data) => {
            // err ? res.json(err) : res.json(data);
            if (err) throw err;
            res.json(data);
            // console.log(data);
        })
    })
    //get current specific user
    app.get("/api/user/:token", (req, res) => {
        db.User.findById(decodeUserID(req.params.token)).exec((err, data) => {
            err ? res.json(err) : res.json(data);
        })
    })

    //update current user
    app.put("/api/user/:token", (req, res) => {
        // res.json({ message: "connected to put route" });
        console.log("user connected to $put /api/user/:token");
        if (req.body.primaryInstrument) {
            console.log("req.body");
            console.log(req.body);
            db.User.findByIdAndUpdate(
                decodeUserID(req.params.token),
                req.body,
                { findAndModify: false }
            )
                .then(res.send("updated"))
        } else {
            console.log("invalid");
        }
    })
    //find another user
    app.get("/api/users/:id", (req, res) => {
        const id = req.params.id;
        console.log("connected");
        db.User.findById(id).exec((err, data) => {
            err ? res.send(err) : res.json(data);
        })
    })
    function decodeUserID(token) {
        const id = jwtDecode(token);
        return id.id;
    }
}