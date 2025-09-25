import seed from './seed'
import db from '../db';
import { events } from "../data/events"
import { users } from "../data/users"
import { attendances } from "../data/attendances"

const runSeed = async(): Promise<void> => {
    try {
        await seed(users, events, attendances);
        await db.end(); // Close the database connection
        console.log('✅ Database seeding complete');
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
      }
      
};

runSeed();