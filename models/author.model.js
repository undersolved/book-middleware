const { pgTable, uuid, text, varchar } = require("drizzle-orm/pg-core");

const authorsTable = pgTable("authors", {
	id: uuid().primaryKey().defaultRandom(),
	firstName: varchar({ length: 80 }).notNull(),
	lastName: varchar({ length: 80 }),
	email: varchar({ length: 255 }).unique().notNull(),
});

module.exports = authorsTable;
