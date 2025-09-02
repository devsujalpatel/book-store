
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 100 }).notNull().unique(),
    password: varchar({ length: 256 }).notNull(),
    salt: varchar({ length: 256 }).notNull(),
})