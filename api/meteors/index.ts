import polka from "polka";
import { Selectable } from "kysely";
import { Meteor as MeteorTable } from "./meteor.table";
import { findMeteors } from "./meteor.repository";

export type Meteor = Selectable<MeteorTable>;

const app = polka();

app.get("/", async (req, res) => {
  const result = await findMeteors(req.query);
  const body = JSON.stringify(result);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json").end(body);
});

export default app;
