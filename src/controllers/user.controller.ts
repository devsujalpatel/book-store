import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({error: "All fields are required"})
    }

    
};

export const loginUser = async (req: Request, res: Response) => {};

export const getProfile = async (req: Request, res: Response) => {};

export const updateUser = async (req: Request, res: Response) => {};
