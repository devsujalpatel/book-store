import { Request, Response } from "express";
import { authorsTable } from "../models/author.model.ts";
import { db } from "../db/index.ts";
import { eq } from "drizzle-orm";
import { booksTable } from "../models/book.model.ts";

export const createAuthor = async (req: Request, res: Response) => {
  const { firstname, lastname, email } = req.body;
  if (!firstname || !lastname || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const result = await db
    .insert(authorsTable)
    .values({
      firstname,
      lastname,
      email,
    })
    .returning({
      id: authorsTable.id,
    });
  if (!result) {
    return res.status(400).json({ error: "Author not created" });
  }
  return res
    .status(201)
    .json({ message: "Author: Firstname Lastname", result });
};

export const getAllAuthors = async (req: Request, res: Response) => {
  const authors = await db.select().from(authorsTable);
  if (!authors) {
    return res.status(404).json({ error: "Zero authors" });
  }
  return res.status(200).json(authors);
};

export const getAuthorById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const author = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, id));
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  return res.status(200).json(author);
};

export const getBooksByAuthorId = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }
  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, id));

  if (!books) {
    return res.status(404).json({ error: "Books not found" });
  }
  return res.status(200).json(books);
};

export const updateAuthor = async (req: Request, res: Response) => {};
export const deleteAuthor = async (req: Request, res: Response) => {};
