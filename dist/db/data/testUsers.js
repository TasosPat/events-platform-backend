"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
let uid_num = 1;
const testUsers = _1.dbUsers.map(user => ({
    ...user,
    uid: (uid_num++).toString()
}));
exports.default = testUsers;
//# sourceMappingURL=testUsers.js.map