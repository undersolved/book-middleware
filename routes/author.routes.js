const express = require("express");
const authorsTable = require("../models/author.model");
const booksTable = require("../models/book.model");
const db = require("../db");
const { eq } = require("drizzle-orm");

const router = express.Router();

router.get("/", async (req, res) => {
	const authors = await db.select().from(authorsTable);
	return res.json(authors).status(200);
});

router.get("/:id", async (req, res) => {
	const [author] = await db
		.select()
		.from(authorsTable)
		.where(eq(authorsTable.id, req.params.id));

	if (!author) {
		return res
			.json({ error: `Author ID ${req.params.id} doesn't exit` })
			.status(404);
	}

	return res.json(author);
});

router.post("/", async (req, res) => {
	const { firstName, lastName, email } = req.body;
	const [result] = await db
		.insert(authorsTable)
		.values({
			firstName,
			lastName,
			email,
		})
		.returning({ id: authorsTable.id });
	return res.json({ message: "Auhtor has been created", id: result.id });
});

router.get("/:id/books", async (req, res) => {
	const books = await db
		.select()
		.from(booksTable)
		.where(eq(booksTable.authorId, req.params.id));

	return res.json(books);
});

module.exports = router;
