import { Router } from "express";
import {
  createOneBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/book.controller.ts";

const bookRoutes = Router();

bookRoutes.get("/", getAllBooks);

bookRoutes.get("/:id", getBookById);

bookRoutes.post("/", createOneBook);

bookRoutes.delete("/:id", deleteBookById);

bookRoutes.patch("/:id", updateBookById);

export default bookRoutes;
