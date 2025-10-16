import { exec } from "child_process";
import seed from "./seed";
import fetchFirebaseUsers from "./fetchFirebaseUsers";

// Example events
const events = [
  { title: "Tech Summit 2025", description: "Tech enthusiasts gathering", date: "2025-10-20", location: "Convention Center", price: 15, start_time: "10:00:00", end_time: "16:00:00" },
  { title: "Music Fest", description: "Live performances", date: "2025-11-05", location: "Central Park", price: 20, start_time: "18:00:00", end_time: "23:00:00" },
];

// Optional attendances
const attendances: any[] = [];

async function reseed() {
  try {
    console.log("🧹 Clearing Firebase users...");
    await execPromise("npx ts-node src/db/seeds/clearFirebaseUsers.ts");

    console.log("🌱 Seeding Firebase users...");
    await execPromise("npx ts-node src/db/seeds/seedFirebaseUsers.ts");

    console.log("🔗 Fetching Firebase users to seed local DB...");
    const firebaseUsers = await fetchFirebaseUsers();

    console.log("🌱 Seeding local DB...");
    await seed(firebaseUsers, events, attendances);

    console.log("🎉 Full reseed complete!");
  } catch (err) {
    console.error("❌ Error during reseed:", err);
  }
}

function execPromise(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = exec(command, (err, stdout, stderr) => {
      if (err) return reject(err);
      console.log(stdout);
      resolve();
    });
    proc.stdout?.pipe(process.stdout);
    proc.stderr?.pipe(process.stderr);
  });
}

reseed();
