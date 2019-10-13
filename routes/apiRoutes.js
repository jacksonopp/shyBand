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
        const id = decodeUserID(req.params.token);
        db.User.findById(id)
            .populate("instruments")
            .populate("favoriteBands")
            .populate("genre")
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
        res.json({ message: "updated" });



    })
    //find another user
    app.get("/api/users/:id", (req, res) => {
        const id = req.params.id;
        console.log("connected");
        db.User.findById(id)
            .populate("instruments")
            .populate("favoriteBands")
            .populate("genre")
            .exec((err, data) => {
                err ? res.send(err) : res.json(data);
            })
    })
    function decodeUserID(token) {
        const id = jwtDecode(token);
        return id.id;
    }
}