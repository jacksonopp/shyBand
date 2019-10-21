const db = require("../models")
const jwtDecode = require("jwt-decode");
const mongoose = require("mongoose");


module.exports = function (app) {
    //get all users
    app.get("/api/users/all/:token", (req, res) => {
        userID = decodeUserID(req.params.token);
        db.User.find({ _id: { $ne: userID } })
            .populate("instruments")
            .populate("genre")
            .exec((err, data) => {
                // err ? res.json(err) : res.json(data);
                if (err) throw err;
                res.json(data);
                // console.log(data);
            })
    })
    //get all genres
    app.get("/api/genres", async function (req, res) {
        const genreDB = await db.Genre.find({})
        res.json(genreDB);
    })
    //get all instruments
    app.get("/api/instruments", async function (req, res) {
        const instDB = await db.Instrument.find({});
        res.json(instDB);
    })
    //get current user
    app.get("/api/user/:token", (req, res) => {
        const id = decodeUserID(req.params.token);
        db.User.findById(id)
            .populate("instruments")
            .populate("favoriteBands")
            .populate("genre")
            .populate({
                path: "thread",
                populate: {
                    path: "messages",
                    model: 'Message',
                }
            })
            .populate({
                path: "thread",
                populate: {
                    path: "fromUser",
                    model: "users"
                }
            })
            .populate({
                path: "thread",
                populate: {
                    path: "toUser",
                    model: "users"
                }
            })
            .populate("bands")
            .exec((err, data) => {
                err ? res.json(err) : res.json(data);
            })
    })

    //update current user
    app.put("/api/user/:token", async function (req, res) {
        // res.json({ message: "connected to put route" });
        const id = decodeUserID(req.params.token);
        console.log("user connected to $put /api/user/:token");
        console.log(req.body);
        // updating instruments
        if (req.body.primaryInstrument) {
            const dbInstrument = await db.Instrument.findOneAndUpdate(
                { instrument: req.body.primaryInstrument },
                { instrument: req.body.primaryInstrument },
                {
                    new: true,
                    upsert: true
                }
            );
            const dbUser = await db.User.findOneAndUpdate(
                { _id: id },
                {
                    $addToSet: {
                        instruments: dbInstrument._id,
                    }
                },
                { new: true }
            );
        }
        // updating favorite bands
        if (req.body.favBand) {
            const dbFavBand = await db.FavoriteBand.findOneAndUpdate(
                { bandName: req.body.favBand },
                { bandName: req.body.favBand },
                {
                    new: true,
                    upsert: true
                }
            );

            const dbUser = await db.User.findOneAndUpdate(
                { _id: id },
                {
                    $addToSet: {
                        favoriteBands: dbFavBand._id,
                    }
                },
                { new: true }
            );
        };
        if (req.body.genre) {
            const dbGenre = await db.Genre.findOneAndUpdate(
                { genre: req.body.genre },
                { genre: req.body.genre },
                {
                    new: true,
                    upsert: true
                }
            );

            const dbUser = await db.User.findOneAndUpdate(
                { _id: id },
                {
                    $addToSet: {
                        genre: dbGenre._id
                    }
                }
            )
        }
        res.json({ id });



    })
    //find another user
    app.get("/api/users/:id", (req, res) => {
        const id = req.params.id;
        console.log("connected");
        db.User.findById(id)
            .populate("instruments")
            .populate("favoriteBands")
            .populate("genre")
            .populate("bands")
            .exec((err, data) => {
                err ? res.send(err) : res.json(data);
            })
    })
    //view all messages sent to current user
    app.get("/api/message/:token", async function (req, res) {
        const userID = decodeUserID(req.params.token);
        console.log(userID);
        console.log("user connected");

        db.Message.find({
            $or: [
                { toUser: userID },
                { fromUser: userID }
            ]
        })
            .exec((err, data) => {
                err ? res.send(err) : res.json(data);
            })
    })
    //add a message
    app.post("/api/thread", async function (req, res) {
        fromUser = decodeUserID(req.body.fromUser)
        console.log("to user:", req.body.toUser);
        console.log("from user:", fromUser);
        console.log("message:", req.body.message);
        console.log("thread number", req.body.thread); //undefined

        //create a message
        const dbMessage = await db.Message.create({
            message: req.body.message,
            fromUser: fromUser,
            toUser: req.body.toUser
        })
        //upsert a new thread with the message
        const dbThread = await db.Thread.create(

            {
                fromUser: fromUser,
                toUser: req.body.toUser,
                messages: [dbMessage._id]
            }
        )
        //attach the thread to both users
        const dbUser = await db.User.updateMany({
            $or: [
                { _id: fromUser },
                { _id: req.body.toUser }
            ]
        }, {
            $addToSet: {
                thread: dbThread._id
            }
        }, {
            new: true,
            upsert: true
        }
        )

        res.json({ message: dbMessage });
    })
    // get all messages from a thread
    app.get("/api/thread/:id", async function (req, res) {
        const dbThread = await db.Thread.findById(req.params.id)
            .populate("messages")
            .populate({
                path: "messages",
                populate: {
                    path: "toUser",
                    model: "users"
                }
            })
            .populate({
                path: "messages",
                populate: {
                    path: "fromUser",
                    model: "users"
                }
            })
            .populate("fromUser")
            .populate("toUser")
        res.json(dbThread);

    })
    //add a message to a thread
    app.post("/api/thread/:id", async function (req, res) {
        console.log(req.body);
        const dbMessage = await db.Message.create({
            message: req.body.message,
            toUser: req.body.toUser,
            fromUser: req.body.fromUser
        })
        console.log(dbMessage);
        const dbThread = await db.Thread.findOneAndUpdate({
            _id: req.body.threadId
        }, {
            $push: {
                messages: dbMessage._id
            }
        })
        res.json({ message: "working on it" });
    })
    //create a new band
    app.post("/api/band", async function (req, res) {
        const userID = decodeUserID(req.body.token);
        console.log("userID: ", userID);
        const dbBand = await db.Band.create({
            bandName: req.body.bandName,
            bandOwner: userID,
            bandMembers: [
                {
                    member: userID,
                    role: req.body.role
                },
            ]
        })
        res.json({ dbBand });
        const dbUser = await db.User.findOneAndUpdate({
            _id: userID
        }, {
            $addToSet: {
                bands: dbBand._id
            }
        })
    })
    //get band info
    app.get("/api/band/:id", async function (req, res) {
        console.log("$$$$$$$$$$$$$$$$$$$$$", req.params.id)
        const bandID = req.params.id;
        const dbBand = await db.Band.findById(bandID)
            .populate("bandOwner")
        res.json(dbBand);
    })
    //request to join a band
    app.post("/api/band/join/:id", async function (req, res) {
        const userID = decodeUserID(req.body.token)
        const bandID = req.params.id;
        console.log(req.body);
        console.log(userID);
        const dbBand = await db.Band.findOneAndUpdate({
            _id: bandID
        }, {
            $addToSet: {
                joinMembers: {
                    user: userID,
                    role: req.body.joinInst
                }
            }
        })
        res.json(dbBand);
    })
    // accept a new band member
    app.put("/api/band/accept", async function (req, res) {
        console.log(req.body);
        const dbBand = await db.Band.findOneAndUpdate({
            _id: req.body.bandID
        }, {
            $push: {
                bandMembers: {
                    member: req.body.userID,
                    role: req.body.role
                }
            },
            $pull: {
                joinMembers: {
                    user: req.body.userID
                }
            }
        })
        res.send(dbBand);

    })
    // reject a new band member
    app.put("/api/band/reject", async function (req, res) {
        const dbBand = await db.Band.findOneAndUpdate({
            _id: req.body.bandID
        }, {
            $pull: {
                joinMembers: {
                    user: req.body.userID
                }
            }
        })
        res.json(dbBand);
    })
    //delete a member
    app.delete("/api/band/delete", function (req, res) {
        console.log(req.body);
        db.Band.findOneAndUpdate({
            _id: req.body.bandID
        }, {
            $pull: {
                bandMembers: {
                    member: req.body.userID
                }
            }
        })
            .exec((err, data) => {
                err ? res.send(err) : res.json(data)
            })
    })

    function decodeUserID(token) {
        const id = jwtDecode(token);
        return id.id;
    }
}