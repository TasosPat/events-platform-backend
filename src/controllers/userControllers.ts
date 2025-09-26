import { Request, Response, NextFunction } from 'express';
import {  } from "../models/userModels";

export async function shortenUrl(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { longUrl } = req.body;
        if (!longUrl) {
            return res.status(400).json({ error: 'longUrl is required' });
          }
        const { shortUrl } = await cutUrl(longUrl);
        return res.status(201).json({shortUrl});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}