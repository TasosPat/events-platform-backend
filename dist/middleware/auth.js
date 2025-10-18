"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const db_1 = __importDefault(require("../db/db"));
const firebase_1 = __importDefault(require("../config/firebase"));
async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "No token found in header" });
    }
    try {
        const decoded = await firebase_1.default.auth().verifyIdToken(token);
        if (!decoded.email) {
            return res.status(400).json({ msg: "Email is missing in token" });
        }
        const result = await db_1.default.query('SELECT * FROM users WHERE uid = $1', [decoded.uid]);
        const dbUser = result.rows[0];
        if (!dbUser) {
            // console.log('User not found, allowing POST request to create user');
            // If the request is a POST to create a new user, proceed
            // console.log(req.method, req.originalUrl);
            if (req.method === 'POST' && req.originalUrl === '/api/users') {
                req.user = {
                    uid: decoded.uid,
                    email: decoded.email,
                    role: "user",
                };
                next();
                return;
            }
            // Otherwise, block access
            res.status(404).json({ msg: 'User not found, please register first' });
            return;
        }
        req.user = {
            uid: decoded.uid,
            email: decoded.email,
            role: dbUser.role,
            dbUser
        };
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
}
//# sourceMappingURL=auth.js.map