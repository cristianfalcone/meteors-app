import { db } from "../database";
import { Meteor } from ".";

type MeteorsParams = Partial<Pick<Meteor, "year" | "mass">>;
type PaginationParams = Partial<{ offset: number; limit: number }>;
type Params = MeteorsParams & PaginationParams;

/**
 * Finds meteors based on the given params
 * @param year - year of the meteor
 * @param mass - mass of the meteor
 * @param offset - offset of the query
 * @param limit - limit of the query
 * @returns
 * Meteors, count of meteors and year param. If no meteors were found,
 * year might be changed to a year where a meteor was found.
 */
export async function findMeteors({ year, mass, offset, limit }: Params = {}) {
  let query = db.selectFrom("meteor").selectAll();

  // helper function to get count of meteors from a query
  const getCount = (q: typeof query) => {
    return q
      .select((eb) => eb.fn.countAll().as("count"))
      .executeTakeFirstOrThrow();
  };

  // let's start with the mass filter since year param can be changed based on this
  if (mass) {
    query = query.where("mass", ">", mass);

    // if we have a year, let's check if there are any meteors within that year and mass
    if (year) {
      const { count } = await getCount(query.where("year", "=", year));

      // if there are no meteors within that year and mass,
      // let's find a meteor with that mass
      if (Number(count) === 0) {
        const result = await query.select("year").limit(1).executeTakeFirst();

        // if we found a meteor, let's set year param to the year we found
        if (result) {
          year = result.year;
        }
      }
    }
  }

  if (year) {
    query = query.where("year", "=", year);
  }

  if (offset) {
    query = query.offset(offset);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const meteors = await query.execute();

  // return year param so we can use it in the frontend in case it was changed
  return {
    meteors,
    year,
  };
}
