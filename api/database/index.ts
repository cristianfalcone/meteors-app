import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import { Meteor } from "../meteors/meteor.table";

export interface Database {
  meteor: Meteor;
}

const dialect = new SqliteDialect({
  database: new SQLite("db.sqlite"),
});

export const db = new Kysely<Database>({
  dialect,
});
