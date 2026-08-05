const booksTable = require("../models/book.model");
const authorsTable = require("../models/author.model");
const { eq } = require("drizzle-orm");

const db = require("../db");
const { table } = require("node:console");

exports.getAllBooks = async function (req, res) {
	const books = await db.select().from(booksTable);
	return res.json(books);
};

exports.getBookById = async function (req, res) {
	const id = parseInt(req.params.id);

	const [book] = await db
		.select()
		.from(booksTable)
		.where((table) => eq(table.id, id))
		.limit(1);

	if (!book) return res.status(404).json({ error: "book not found" });

	return res.json(book);
};

exports.createBook = async function (req, res) {
	const { title, authorId, description } = req.body;

	if (!title || title === "")
		return res.status(400).json({ message: "its a bad request, check title" });

	const [result] = await db
		.insert(booksTable)
		.values({
			title,
			authorId,
			description,
		})
		.returning({
			id: booksTable.id,
		});

	return res
		.status(201)
		.json({ message: "book added successfully", id: result.id });
};

exports.deleteBookById = async function (req, res) {
	const id = parseInt(req.params.id);

	await db.delete(booksTable).where(eq(booksTable.id, id));

	return res.status(200).json({ message: `book deleted successfully` });
};

/* -------------------------------------------------------------------------- */
/*                    models views and controllers achieved                   */
/* -------------------------------------------------------------------------- */
