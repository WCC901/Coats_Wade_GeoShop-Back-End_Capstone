const express = require('express');
const Country = require('../models/country.js');

const router = express.Router();

// Create a new country
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
    try {
        const result = await Country.findById(req.params.id);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

// Update a country
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.name || !req.body.currentPrice) {
            return res.status(400).send({ message:'Send required fields' });
        };
        const result = await Country.findByIdAndUpdate(req.params.id, req.body);

        if (!result) {
            return res.status(404).json( {errorMessage: 'Country was not found' } );
        }
        return res.status(200).send({successMessage: 'Country Updated!' });

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

//Remove a country by id
router.delete('/:id', async (req, res) => {
    try {
        const result = await Country.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json( { errorMessage: 'Country was not found' } );
        }
        return res.status(200).send({ successMessage: 'Country Deleted' });

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;