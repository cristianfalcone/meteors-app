interface MeteorFormProps {
  showAlert: boolean;
  count: number;
  year: string;
  mass: string;
  onChange: (name: string, value: string) => void;
}

export default function MeteorForm({
  showAlert,
  count,
  year,
  mass,
  onChange,
}: MeteorFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">Search for</p>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Meteors
              </h1>
            </div>
          </div>
          {showAlert && (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Year changed
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      No meteors were found for the year you entered. Showing
                      results for year {year} instead.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="px-6 py-5 text-center text-sm font-medium">
          <span className="text-gray-900">{count}</span>{" "}
          <span className="text-gray-600">meteors found</span>
        </div>
        <Input
          label="Year"
          name="year"
          value={year}
          onChange={handleInputChange}
        />
        <Input
          label="Mass"
          name="mass"
          value={mass}
          disabled={year.length !== 4}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  disabled,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="px-6 py-5 text-center text-sm">
      <label htmlFor={name} className="me-2 font-medium">
        {label}
      </label>
      <input
        id={name}
        type="number"
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="rounded-md border-1 shadow-sm px-1 text-end"
      />
    </div>
  );
}
