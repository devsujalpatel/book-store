import { Router } from "express";
import {
  createOneBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/book.controller.ts";
import {
  checkLoggedIn,
  ensureAuthenticated,
} from "../middlewares/auth.middleware.ts";

const bookRoutes = Router();

bookRoutes.use(checkLoggedIn, ensureAuthenticated);

bookRoutes.get("/", getAllBooks);

bookRoutes.get("/:id", getBookById);

bookRoutes.post("/", createOneBook);

bookRoutes.delete("/:id", deleteBookById);

bookRoutes.patch("/:id", updateBookById);

export default bookRoutes;
