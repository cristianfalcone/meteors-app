import fs from "node:fs";
import { Kysely } from "kysely";
import { Database } from "../database";

export const name = "MeteorSeeder";

export const run = async (db: Kysely<Database>) => {
  const tables = await db.introspection.getTables();

  if (!tables.find((table) => table.name === "meteor")) {
    throw new Error("Table 'meteor' does not exist. Did you run migrations?");
  }

  let meteors;

  if (fs.existsSync("meteors.json")) {
    meteors = JSON.parse(fs.readFileSync("meteors.json", "utf-8"));
  } else {
    console.log("🌠 fetching meteors from NASA...");

    const response = await fetch(
      "https://data.nasa.gov/resource/y77d-th95.json",
    );

    meteors = await response.json();

    try {
      fs.writeFileSync("meteors.json", JSON.stringify(meteors));
    } catch (err) {
      console.error(err);
    }
  }

  for (const meteor of meteors) {
    try {
      await db
        .insertInto("meteor")
        .values({
          id: parseInt(meteor.id),
          name: meteor.name,
          nametype: meteor.nametype,
          recclass: meteor.recclass,
          mass: meteor.mass,
          fall: meteor.fall,
          year: new Date(meteor.year).getFullYear(),
          reclat: parseFloat(meteor.reclat),
          reclong: parseFloat(meteor.reclong),
          geolocation: JSON.stringify(meteor.geolocation),
        })
        .execute();
      console.log(`✅ meteor "${meteor.name}" was inserted successfully`);
    } catch (err) {
      console.error(`❌ failed to insert meteor "${meteor.name}"`);
      console.error(err);
    }
  }
};
