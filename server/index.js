import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

// Bosh sahifa
app.get('/', (req, res) => {
    return res.status(234).send("Bosh sahifa");
});

// Ma'lumotlar omboriga ulanish
mongoose.connect(mongodbURL)
    .then(() => {
        console.log("Ma'lumotlar omboriga muvoffaqiyatli ulanish!");
        app.listen(PORT, () => {
            console.log(`${PORT} - portni eshitishni boshladim!`);
        });
    })
    .catch((err) => console.log(err))