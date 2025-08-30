import { index, text, pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { authorsTable } from "./author.model.ts";

export const booksTable = pgTable(
  "books",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid()
      .references(() => authorsTable.id)
      .notNull(),
  },
  (table) => ({
    searchIndexOnTitle: index('title_index').using("gin", 
      sql`to_tsvector('english', ${table.title})`
    ),
  })
);
