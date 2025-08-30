import { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import { booksTable } from "../models/book.model.ts";
import { authorsTable } from "../models/author.model.ts";
import { db } from "../db/index.ts";

// Create
export const createOneBook = async (req: Request, res: Response) => {
  const { title, description, authorId } = req.body;

  if (!title || !authorId) {
    return res.status(400).json({ error: "Title and authorId are required" });
  }

  const result = await db
    .insert(booksTable)
    .values({
      title,
      description,
      authorId,
    })
    .returning({
      id: booksTable.id,
    });

  res.status(201).json({ message: "Book created", result });
};

// Read
export const getAllBooks = async (req: Request, res: Response) => {
  const search = req.query.search;
  if (search) {
    const book = await db
      .select()
      .from(booksTable)
      .where(
        sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`
      );
    return res.status(200).json(book);
  }
  const books = await db.select().from(booksTable);

  return res.status(200).json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }
  const book = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .leftJoin(authorsTable, eq(booksTable.authorId, booksTable.authorId))
    .limit(1);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
};

// Update

export const updateBookById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description, authorId } = req.body;

  const result = await db
    .update(booksTable)
    .set({ title, description, authorId })
    .where(eq(booksTable.id, id))
    .returning({
      id: booksTable.id,
      title: booksTable.title,
      description: booksTable.description,
      authorId: booksTable.authorId,
    });
  res.status(200).json({ message: "Book updated", result });
};

// Delete
export const deleteBookById = async (req: Request, res: Response) => {
  const id = req.params.id;
  await db.delete(booksTable).where(eq(booksTable.id, id));
  res.status(200).json({ message: "Book deleted" });
};
