const fs = require("node:fs");

exports.loggerMiddleware = function (req, res, next) {
	const now = new Date();

	const day = String(now.getDate()).padStart(2, "0");
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const year = String(now.getFullYear()).slice(-2);

	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	const timestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

	const log = `\n[${timestamp}] ${req.method} ${req.path}`;

	fs.appendFileSync("logs.txt", log, "utf8");

	next();
};
