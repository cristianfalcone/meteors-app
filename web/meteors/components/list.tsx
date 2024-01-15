import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Meteor } from "../../../api/meteors";
import MeteorListItem from "./item";

interface MeteorListProps {
  meteors: Meteor[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function MeteorList({
  meteors,
  loading,
  hasMore,
  onLoadMore,
}: MeteorListProps) {
  const containerElement = useRef(null);
  const scrollElement = useRef(null);
  const [height, setHeight] = useState(0);

  const { length } = meteors;

  const virtualizer = useVirtualizer({
    count: hasMore ? meteors.length + 1 : meteors.length,
    getScrollElement: () => scrollElement.current,
    estimateSize: () => 100,
  });

  const rows = virtualizer.getVirtualItems();

  // Load more when the user scrolls to the bottom of the list
  useEffect(() => {
    const [last] = [...rows.reverse()];

    if (!last) {
      return;
    }

    if (last.index >= length - 1 && hasMore && !loading) {
      onLoadMore();
    }
  }, [length, loading, hasMore, onLoadMore, rows]);

  // Update the height of the scroll element when the container resizes
  useLayoutEffect(() => {
    const element = containerElement.current as HTMLElement | null;

    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      const height = element.clientHeight;
      setHeight(height);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerElement]);

  return (
    <div
      ref={containerElement}
      className="h-full overflow-hidden rounded-lg bg-white shadow"
    >
      <div ref={scrollElement} className="overflow-y-auto" style={{ height }}>
        <div
          className="relative w-full divide-y divide-gray-200"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          {rows.map((row) => {
            const isLoaderRow = row.index > meteors.length - 1;
            const meteor = meteors[row.index];

            return (
              <div
                key={row.index}
                className="absolute top-0 left-0 w-full"
                style={{
                  height: `${row.size}px`,
                  transform: `translateY(${row.start}px)`,
                }}
              >
                {isLoaderRow ? (
                  <div className="h-full p-5 sm:px-6 flex items-center justify-center">
                    {hasMore
                      ? "Loading more meteors..."
                      : "No more meteors to load"}
                  </div>
                ) : (
                  <MeteorListItem meteor={meteor} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
