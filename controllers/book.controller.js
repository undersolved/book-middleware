const booksTable = require("../models/book.model");
const authorsTable = require("../models/author.model");

const db = require("../db");

exports.getAllBooks = function (req, res) {
	res.status(200).json(BOOKS);
};

exports.getBookById = function (req, res) {
	const id = parseInt(req.params.id);
	if (isNaN(id)) return res.status(400).json({ error: "its a bad request id" });
	const book = BOOKS.find((e) => e.id === id);

	if (!book) return res.status(404).json({ error: "book not found" });

	return res.json(book);
};

exports.createBook = function (req, res) {
	const { title, author } = req.body;
	if (!title || title === "")
		return res.status(400).json({ message: "its a bad request, check title" });
	if (!author || author === "")
		return res.status(400).json({ message: "its a bad request, check author" });
	const id = BOOKS.length + 1;
	const book = { id, title, author };
	BOOKS.push(book);
	return res.status(201).json({ message: "book added successfully" });
};

exports.deleteBookById = function (req, res) {
	const id = parseInt(req.params.id);
	if (isNaN(id)) return res.status(400).json({ error: "its a bad request id" });

	const indexToDelete = BOOKS.findIndex((e) => e.id === id);

	if (indexToDelete < 0) {
		return res.status(400).json({ error: "its a bad request id" });
	}

	BOOKS.splice(indexToDelete, 1);
	return res
		.status(200)
		.json({ message: `book id ${id} deleted successfully` });
};

/* -------------------------------------------------------------------------- */
/*                    models views and controllers achieved                   */
/* -------------------------------------------------------------------------- */
