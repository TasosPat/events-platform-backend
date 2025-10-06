import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import calendarRoutes from "./routes/calendarRoutes";
import { errorHandler } from "./middleware/errorHandling"

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).send({ msg: "Events Platform Backend is running 🚀" });
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/attendances", attendanceRoutes);
app.use("/api/calendar", calendarRoutes);

app.use(errorHandler);

export default app;