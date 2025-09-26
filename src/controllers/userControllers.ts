import { Request, Response, NextFunction } from 'express';
import { fetchUsers, fetchUserByID } from "../models/userModels";

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
    
}

export async function getUserByID(req: Request, res: Response, next: NextFunction): Promise<any> {

}