"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUsers = void 0;
const _1 = require("./");
exports.dbUsers = _1.firebaseUsers.map(user => {
    let role;
    let description;
    switch (user.displayName) {
        case 'Alice Johnson':
            role = 'staff';
            description = 'Community organizer and event host.';
            break;
        case 'Bob Smith':
            role = 'user';
            description = 'Enjoys attending workshops and learning new skills.';
            break;
        case 'Carol Lee':
            role = 'user';
            description = 'Loves volunteering and community activities.';
            break;
        case 'David Brown':
            role = 'staff';
            description = 'Experienced in running local music events.';
            break;
        default:
            role = 'user';
            description = '';
    }
    return {
        uid: '', // will be populated after creating/fetching Firebase users
        name: user.displayName,
        email: user.email,
        role,
        description
    };
});
//# sourceMappingURL=dbUsers.js.map