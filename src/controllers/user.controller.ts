import { Request, Response } from "express";
import crypto from "node:crypto";
import { db } from "../db/index.ts";
import { usersTable } from "../models/user.model.ts";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../middlewares/auth.middleware.ts";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [existingUser] = await db
      .select({
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = crypto.randomBytes(256).toString("hex");
    const hashedPassword = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    const [user] = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
        salt,
      })
      .returning({
        id: usersTable.id,
      });

    return res
      .status(201)
      .json({ status: "success", data: { userId: user.id } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: "Internal server error", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [existingUser] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        password: usersTable.password,
        salt: usersTable.salt,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const existingSalt = existingUser.salt;
    const existinHash = existingUser.password;

    const newHash = crypto
      .createHmac("sha256", existingSalt)
      .update(password)
      .digest("hex");

    if (newHash !== existinHash) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    const payload = {
      id: existingUser.id,
      name: existingUser.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return res.status(200).json({ status: "success", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: "Internal server error", error });
  }
};

export const getProfile = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const [user] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  return res.status(200).json({ status: "success", data: user });
};

export const updateUser = async (req: Request, res: Response) => {};
