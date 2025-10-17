import {firebaseUsers} from './';

export const dbUsers = firebaseUsers.map(user => {
    let role: 'user' | 'staff';
    let description: string;

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
    }
  });