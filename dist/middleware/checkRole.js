"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = checkRole;
function checkRole(requiredRole) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ msg: "User not authenticated" });
        }
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ msg: `This action is only allowed for ${requiredRole === "staff" ? "staff members" : requiredRole + "s"}` });
        }
        next();
    };
}
//# sourceMappingURL=checkRole.js.map