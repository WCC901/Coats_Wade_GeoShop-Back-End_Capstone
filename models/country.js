import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

export const Country = mongoose.model("Country", countrySchema);
