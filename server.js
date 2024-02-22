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

        const result = await Country.create(newCountry);
        return res.status(201).send(result);

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

// Get all countries
app.get('/countries', async (req, res) => {
    try {
        const countries = await Country.find({});
        return res.status(200).json({
            totalEntries: countries.length,
            data: countries
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

// Get a country by id
app.get('/countries/:id', async (req, res) => {
    try {
        const result = await Country.findById(req.params.id);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

// Update a country
app.put('/countries/:id', async (req, res) => {
    try {
        if (!req.body.name || !req.body.currentPrice) {
            return res.status(400).send({ message:'Send required fields' });
        };

        const result = await Country.findByIdAndUpdate(req.params.id, req.body);
        if (!result) {
            return res.status(404).json( {errorMessage: 'Country was not found'} );
        }

        return res.status(200).send({successMessage: "Country Updated!" });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

//Remove a country by id
app.delete("countries/:id", async (req, res) => {
    try {

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
