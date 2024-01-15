import { Generated, JSONColumnType } from "kysely";

export interface Meteor {
  id: Generated<number>;
  name: string;
  nametype: string;
  recclass: string;
  mass: number;
  fall: string;
  year: number;
  reclat: number;
  reclong: number;
  geolocation: JSONColumnType<{
    type: "Point";
    coordinates: [number, number];
  }>;
}
