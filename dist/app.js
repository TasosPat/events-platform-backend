"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const attendanceRoutes_1 = __importDefault(require("./routes/attendanceRoutes"));
const calendarRoutes_1 = __importDefault(require("./routes/calendarRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const errorHandling_1 = require("./middleware/errorHandling");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/health", (req, res) => {
    res.status(200).send({ msg: "Events Platform Backend is running 🚀" });
});
app.use("/api/users", userRoutes_1.default);
app.use("/api/events", eventRoutes_1.default);
app.use("/api/attendances", attendanceRoutes_1.default);
app.use("/api/calendar", calendarRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use(errorHandling_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map