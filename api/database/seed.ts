import * as meteor from "../meteors/meteor.seeder.ts";
import { db } from ".";

async function seed() {
  const seeders = [meteor];

  for (const seeder of seeders) {
    try {
      await seeder.run(db);
      console.log(`✅ seeder "${seeder.name}" was executed successfully`);
    } catch (err) {
      console.error(`❌ failed to execute seeder "${seeder.name}"`);
      console.error(err);
    }
  }
}

seed();
