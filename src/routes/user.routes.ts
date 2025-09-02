import { Router } from "express";
import {
  getProfile,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.ts";
import {
  checkLoggedIn,
  ensureAuthenticated,
} from "../middlewares/auth.middleware.ts";

const userRoutes = Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/profile", checkLoggedIn, ensureAuthenticated, getProfile);

userRoutes.patch("/update", checkLoggedIn, ensureAuthenticated, updateUser);

export default userRoutes;
