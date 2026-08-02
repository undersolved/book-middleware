const express = require("express");
const books = require("./in-mem-db");
const fs = require("node:fs");

const app = express();
const PORT = 8000;

app.use(express.json()); // middleware/plugin

app.use(function (req, res, next) {
	const log = `\n [${Date.now()}] ${req.method} ${req.path}`;
	fs.appendFileSync("logs.txt", log, "utf-8");
	next();
});

app.use(function (req, res, next) {
	console.log("I am Middleware A");
	next();
});

app.use(function (req, res, next) {
	console.log(" I am Middleware B");
	next();
});

// ROUTES

app.get("/books", (req, res) => {
	res.status(200).json(books);
});

// dynamic route for individual id book IYKYKk

app.get("/books/:id", (req, res) => {
	const id = parseInt(req.params.id);
	if (isNaN(id)) return res.status(400).json({ error: "its a bad request id" });
	const book = books.find((e) => e.id === id);

	if (!book) return res.status(404).json({ error: "book not found" });

	return res.json(book);
});

app.post("/books", (req, res) => {
	const { title, author } = req.body;
	if (!title || title === "")
		return res.status(400).json({ message: "its a bad request, check title" });
	if (!author || author === "")
		return res.status(400).json({ message: "its a bad request, check author" });
	const id = books.length + 1;
	const book = { id, title, author };
	books.push(book);
	return res.status(201).json({ message: "book added successfully" });
});

app.delete("/books/:id", (req, res) => {
	const id = parseInt(req.params.id);
	if (isNaN(id)) return res.status(400).json({ error: "its a bad request id" });

	const indexToDelete = books.findIndex((e) => e.id === id);

	if (indexToDelete < 0) {
		return res.status(400).json({ error: "its a bad request id" });
	}

	books.splice(indexToDelete, 1);
	return res
		.status(200)
		.json({ message: `book id ${id} deleted successfully` });
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
