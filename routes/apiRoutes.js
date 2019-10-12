const db = require("../models")
const jwtDecode = require("jwt-decode");


module.exports = function (app) {
    //get all users
    app.get("/api/users/:token", (req, res) => {
        userID = decodeUserID(req.params.token);
        db.User.find({ _id: { $ne: userID } }).exec((err, data) => {
            // err ? res.json(err) : res.json(data);
            if (err) throw err;
            res.json(data);
            console.log(data);
        })
    })
    //get a specific user
    app.get("/api/user/:token", (req, res) => {
        db.User.findById(decodeUserID(req.params.token)).exec((err, data) => {
            err ? res.json(err) : res.json(data);
        })
    })

    //update a user
    app.put("/api/user/:token", (req, res) => {
        res.json({ message: "connected to put route" });
        console.log("user connected to $put /api/user/:token");
        console.log(req.body);
    })
    function decodeUserID(token) {
        const id = jwtDecode(token);
        return id.id;
    }
}