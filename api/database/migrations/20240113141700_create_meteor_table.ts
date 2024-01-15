import { Kysely } from "kysely";

export const up = async (database: Kysely<unknown>) => {
  await database.schema
    .createTable("meteor")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("nametype", "text")
    .addColumn("recclass", "text")
    .addColumn("mass", "integer")
    .addColumn("fall", "text")
    .addColumn("year", "integer")
    .addColumn("reclat", "decimal")
    .addColumn("reclong", "decimal")
    .addColumn("geolocation", "jsonb")
    .execute();

  // await database.schema
  //   .createIndex("year_mass_idx")
  //   .on("meteor")
  //   .columns(["year", "mass"])
  //   .execute();
};

export async function down(database: Kysely<unknown>) {
  await database.schema.dropTable("meteor");
}
