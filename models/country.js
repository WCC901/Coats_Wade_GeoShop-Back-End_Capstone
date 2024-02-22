const mongoose = require('mongoose');
const Schema = mongoose.Schema

const countrySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        currentPrice: {
            type: Number,
            required: true
        },
        attractions: {
            type: [String],
            required: false
        }
    }
);

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
