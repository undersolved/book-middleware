require("dotenv/config");
const express = require("express");

const { loggerMiddleware } = require("./middlewares/logger");
const bookRouter = require("./routes/book.routes");
const router = require("./routes/book.routes");

const app = express();
const PORT = 8000;

app.use(express.json()); // middleware/plugin
app.use(loggerMiddleware);

// now adding that router such that it is used for all routes

app.use("/books", bookRouter);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
