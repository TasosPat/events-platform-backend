import { Request, Response, NextFunction } from "express";
import axios from "axios";

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: "Email and password are required" });
      return;
    }

    const apiKey = process.env.FIREBASE_API_KEY;
    const firebaseURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const response = await axios.post(firebaseURL, {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, expiresIn } = response.data;

    res.status(200).json({ idToken, refreshToken, expiresIn });
  } catch (err: any) {
    if (err.response?.data?.error?.message) {
      res.status(400).json({ msg: err.response.data.error.message });
    } else {
      next(err);
    }
  }
}
