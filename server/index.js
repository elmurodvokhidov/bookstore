import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Bosh sahifa
app.get('/', (req, res) => {
    return res.status(234).send("Bosh sahifa");
});

// Yangi kitob qo'shish yo'lagi
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Talab qilingan barcha maydonlarni to'ldiring!" });
        };

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Ma'lumotlar omboridan barcha kitoblarni olish yo'lagi
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Ma'lumotlar omboridan bitta kitobni olish yo'lagi
app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const foundBook = await Book.findById(id);

        if (!foundBook) return res.status(404).send({ message: "Berilgan id-ga mos kitob topilmadi!" })

        return res.status(200).json(foundBook);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
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