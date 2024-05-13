import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                msg: 'Send all required fields: title,author,publishYear',
            })
        }
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        });

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (err) {
        console.log(err.msg);
        res.status(500).send({ msg: err.msg });
    }
});

// Route for Get  from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length, data: books
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: err.message });
    }
})

// ROute for get one book from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book)
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: err.message });
    }
})

// ROute to update a Book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                msg: 'Send all required fields: title,author,publishYear',
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send({
                msg: 'Book not found'
            })
        }
        return res.status(200).send({ msg: 'Book updated successfully.' })

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                msg: 'Book not found'
            })
        }
        return res.status(200).send({ msg: 'Book deleted successfully.' })

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: err.message });
    }
})

export default router;