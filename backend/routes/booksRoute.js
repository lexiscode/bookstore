import express from 'express';
import { Book } from '../models/bookModel.js';	

const router = express.Router();

// Route for save a new book, POST request
router.post("/", async (req, res) => {
  try {
    // checks if all fields retrieves data or not
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Send all required fields" });
    }
    // stores the retrieved data in newBook variable
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    // stores the newBook data into the Book model database
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// Route for getting all books from the database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    // return res.status(200).json(books);
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// Route for getting a book from all books inside the database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// Route for updating a book inside the database
router.put("/:id", async (req, res) => {
  try {
    // checks if all fields retrieves data or not
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Send all required fields" });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// Route for deleting a book inside the database
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

export default router;