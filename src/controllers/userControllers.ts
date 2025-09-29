import { Request, Response, NextFunction } from 'express';
import { fetchUsers, fetchUserByID } from "../models/userModels";

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const users = await fetchUsers();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    } 
}

export async function getUserByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { user_id } = req.params;
        const user = await fetchUserByID(Number(user_id));
        res.status(200).json(user);
    } catch (err) {
        next(err);
    } 
}