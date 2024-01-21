import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Yangi kitob qo'shish yo'lagi
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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

// Ma'lumotlar omborida mavjud kitobni tahrirlash
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Talab qilingan barcha maydonlarni to'ldiring!" });
        };

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) return res.status(404).json({ message: "Berilgan id-ga mos kitob topilmadi!" });

        return res.status(200).send({ message: "Kitob muvoffaqiyatli tahrirlandi!" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});

// Ma'lumotlar omboridan kitob o'chirib yuborish yo'lagi
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) return res.status(404).json({ message: "Berilgan id-ga mos kitob topilmadi!" });

        return res.status(200).send({ message: "Kitob muvoffaqiyatli o'chirildi!" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});

export default router;