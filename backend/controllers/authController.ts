import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.registerUser(name, email, password);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);
        res.status(200).json({ message: "Login successful", user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
