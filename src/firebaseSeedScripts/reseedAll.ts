import seedFirebaseUsers from './seedFirebaseUsers';
import fetchFirebaseUsers from './fetchFirebaseUsers';
import clearFirebaseUsers from './clearFirebaseUsers';
import seed from '../db/seeds/seed';
import { events, attendances } from '../db/data';

async function reseedAll() {
  try {
    // 1. Clear Firebase
    console.log('Deleting Firebase users...');
    await clearFirebaseUsers();

    // 2. Seed Firebase
    console.log('Seeding Firebase users...');
    await seedFirebaseUsers();

    // 3. Fetch Firebase users
    const firebaseUsers = await fetchFirebaseUsers();

    // 4. Seed local DB
    console.log('Seeding local DB...');
    await seed(firebaseUsers, events, attendances);

    console.log('Full reseed complete!');
  } catch (err) {
    console.error('❌ Error during reseed:', err);
  }
}

if (require.main === module) {
  reseedAll();
}
