"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = insertUser;
exports.fetchUsers = fetchUsers;
exports.fetchUserByID = fetchUserByID;
exports.editUser = editUser;
const db_1 = __importDefault(require("../db/db"));
async function insertUser(newUser) {
    const { uid, name, role, description, email } = newUser;
    const query = `
    INSERT INTO users (uid, name, role, description, email)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
    const args = [uid, name, role, description, email];
    const { rows } = await db_1.default.query(query, args);
    if (!rows[0]) {
        throw new Error("Failed to create user in database");
    }
    return rows[0];
}
async function fetchUsers() {
    const query = `SELECT * FROM users ORDER BY user_id ASC`;
    const { rows } = await db_1.default.query(query);
    return rows;
}
async function fetchUserByID(user_id) {
    if (!user_id) {
        return null;
    }
    const query = `SELECT * FROM users WHERE user_id=$1`;
    const args = [user_id];
    const { rows } = await db_1.default.query(query, args);
    if (!rows[0]) {
        throw {
            status: 404,
            msg: `No user found for user_id: ${user_id}`,
        };
    }
    return rows[0];
}
async function editUser(uid, displayName, email, description) {
    const result = await db_1.default.query(`UPDATE users 
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         description = COALESCE($3, description)
     WHERE uid = $4
     RETURNING *;`, [displayName || null, email || null, description || null, uid]);
    return result.rows[0];
}
//# sourceMappingURL=userModels.js.map