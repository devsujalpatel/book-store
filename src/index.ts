import express from "express";
import dotenv from "dotenv";

// routes imports
import authorRoutes from "./routes/author.routes.ts";
import bookRoutes from "./routes/book.routes.ts";
import userRoutes from "./routes/user.routes.ts";

dotenv.config();
const app = express();
const PORT = process.env.PORT! || 3001;

// Middleware
app.use(express.json());

// custom middleware

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Books Route
app.use("/books", bookRoutes);

// Author Route
app.use("/authors", authorRoutes);

// User Route
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
