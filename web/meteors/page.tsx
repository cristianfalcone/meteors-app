import { useState, useEffect } from "react";
import MeteorForm from "./components/form";
import MeteorList from "./components/list";
import useMeteors from "./hooks/use-meteors";

export default function Meteors() {
  const [year, setYear] = useState("");
  const [mass, setMass] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const {
    meteors,
    count,
    newYear,
    error,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    setQueryYear,
  } = useMeteors(year, mass);

  useEffect(() => {
    if (newYear && year.length === 4 && newYear !== year) {
      setYear(newYear);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  }, [year, newYear]);

  const handleFormChange = (name: string, value: string) => {
    if (name === "mass") {
      setMass(value);
      setQueryYear(year);
      return;
    }

    if (name === "year") {
      if (value.length > 4) return;
      if (value.length === 0 || value.length === 4) setQueryYear(value);
      setYear(value);
      setMass("");
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4 flex flex-col gap-y-4 h-full">
      <MeteorForm
        count={count}
        showAlert={showAlert}
        year={year}
        mass={mass}
        onChange={handleFormChange}
      />
      <div className="grow overflow-hidden">
        {isPending && !isFetchingNextPage ? (
          <Feedback title="Loading meteors..." />
        ) : error ? (
          <Feedback title="Error" message={error.message ?? "Unknown error"} />
        ) : meteors.length === 0 ? (
          <Feedback title="No meteors" message="Refine your search" />
        ) : (
          <MeteorList
            meteors={meteors}
            loading={isFetchingNextPage}
            hasMore={hasNextPage}
            onLoadMore={fetchNextPage}
          />
        )}
      </div>
    </div>
  );
}

function Feedback({ title, message }: { title: string; message?: string }) {
  return (
    <div className="h-full p-4 rounded-lg bg-white shadow">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
    </div>
  );
}
