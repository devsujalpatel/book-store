import { Router } from "express";
import {
  getProfile,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.ts";

const userRoutes = Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/profile", getProfile);

userRoutes.patch("/update", updateUser);

export default userRoutes;
