require(`dotenv`).config();

const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

const app = express();

app.get("/", (req, res) => {
    console.log(req);
    return res.status(202).send("GeoShop Homepage!")
});

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB!");
        app.listen(port, () => {
            console.log(`App listening on port: ${port}`);
        });
    }).catch((e) => {
        console.log(e);
    });
