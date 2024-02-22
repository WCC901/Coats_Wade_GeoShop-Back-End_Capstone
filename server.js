require(`dotenv`).config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const countries = require("./routes/countries.js");

const app = express();

// Middleware for parsing through the request body
app.use(express.json());


// Main server route
app.get('/', (req, res) => {
    console.log(req);
    return res.status(202).send('GeoShop Homepage!')
});

app.use('/countries', countries);

// Connect to Mongoose and send the appropriate message to the console.
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(port, () => {
            console.log(`App listening on port: ${port}`);
        });
    }).catch((e) => {
        console.log(e);
    });
