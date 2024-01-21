import express from "express";
import { PORT } from "./config.js";

const app = express();

// Bosh sahifa
app.get('/', (req, res) => {
    return res.status(234).send("Bosh sahifa");
});

app.listen(PORT, () => {
    console.log(`app is listening to port: ${PORT}`);
});