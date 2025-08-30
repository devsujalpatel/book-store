import express from "express";
import dotenv from "dotenv";
import { loggerMiddleware } from "./middlewares/logger.ts";

// routes imports
import authorRoutes from "./routes/author.routes.ts";
import bookRoutes from "./routes/book.routes.ts";

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// custom middleware
app.use(loggerMiddleware);

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Books Route
app.use("/books", bookRoutes);

// Author Route
app.use("/authors", authorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
