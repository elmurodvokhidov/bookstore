import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
// app.use(cors());

// Option 2: Allow custom origins
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

// Bosh sahifa
app.get('/', (req, res) => {
    return res.status(234).send("Bosh sahifa");
});

app.use('/books', booksRoute);

// Ma'lumotlar omboriga ulanish
mongoose.connect(mongodbURL)
    .then(() => {
        console.log("Ma'lumotlar omboriga muvoffaqiyatli ulanish!");
        app.listen(PORT, () => {
            console.log(`${PORT} - portni eshitishni boshladim!`);
        });
    })
    .catch((err) => console.log(err))