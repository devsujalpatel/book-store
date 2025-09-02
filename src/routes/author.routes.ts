import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  getBooksByAuthorId,
  updateAuthor,
} from "../controllers/author.controller.ts";
import {
  checkLoggedIn,
  ensureAuthenticated,
} from "../middlewares/auth.middleware.ts";

const authorRoutes = Router();

authorRoutes.use(checkLoggedIn, ensureAuthenticated);

authorRoutes.post("/", createAuthor);

authorRoutes.get("/", getAllAuthors);

authorRoutes.get("/:id", getAuthorById);

authorRoutes.patch("/:id", updateAuthor);

authorRoutes.delete("/:id", deleteAuthor);

authorRoutes.get("/:id/books", getBooksByAuthorId);

export default authorRoutes;
