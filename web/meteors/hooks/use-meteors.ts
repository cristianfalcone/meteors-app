import { useState, useRef, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/use-debounce";
import { Meteor } from "../../../api/meteors";

export default function useMeteors(year: string, mass: string) {
  const [queryYear, setQueryYear] = useState(year);
  const queryMass = useDebounce(mass, 500);
  const offset = useRef(0);
  const limit = 20;

  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<{
    meteors: Meteor[];
    year: number;
  }>({
    queryKey: ["meteors", queryYear, queryMass],
    queryFn: async ({ queryKey, pageParam }) => {
      const [, year, mass] = queryKey;

      const query = new URLSearchParams({
        limit: String(limit),
        offset: String(pageParam),
      });

      if (typeof year === "string" && year.length) {
        query.set("year", year);
      }

      if (typeof mass === "string" && mass.length) {
        query.set("mass", mass);
      }

      const response = await fetch(`/api/meteors?${query}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    initialPageParam: offset.current,
    getNextPageParam: (lastPage) => {
      // Stop fetching if we've reached the end
      if (lastPage.meteors.length < limit) {
        return undefined;
      }

      return offset.current + limit;
    },
  });

  // Update the year in the form if API returns a different year
  const lastYear = data?.pages[data.pages.length - 1]?.year;

  const newYear = useMemo(() => {
    if (lastYear) {
      const nextYear = String(lastYear);

      if (nextYear !== queryYear) {
        return nextYear;
      }
    }

    return "";
  }, [lastYear, queryYear]);

  const meteors = useMemo(
    () => data?.pages.flatMap((page) => page.meteors) ?? [],
    [data],
  );

  offset.current = meteors.length;

  return {
    meteors,
    newYear,
    error,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    setQueryYear,
  };
}
