import {dbUsers} from './';

let uid_num = 1;
const testUsers = dbUsers.map(user => ({
  ...user,
  uid: (uid_num++).toString()
}));

export default testUsers