require(`dotenv`).config();

const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const Country = require('./models/country.js');

const app = express();

// Middleware
app.use(express.json());

// Main server route
app.get('/', (req, res) => {
    console.log(req);
    return res.status(202).send('GeoShop Homepage!')
});

// Create a new country
app.post('/countries', async (req, res) => {
    try {
        if (!req.body.name || !req.body.currentPrice) {
            return res.status(400).send({ message:'Send required fields' });
        };

        const newCountry = {
            name: req.body.name,
            currentPrice: req.body.currentPrice,
            attractions: req.body.attractions
        };

        const country = await Country.create(newCountry);
        return res.status(201).send(country);

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});


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
