import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).send({ msg: "Events Platform Backend is running 🚀" });
});

export default app;