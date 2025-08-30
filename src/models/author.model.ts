import { integer, pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const authorsTable = pgTable("authors", {
  id: uuid().primaryKey().defaultRandom(),
  firstname: varchar({ length: 100 }).notNull(),
  lastname: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 100 }).notNull().unique(),
});
