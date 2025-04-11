import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  ageFilter: string | null;
  setAgeFilter: (value: string | null) => void;
  sortByDate: "asc" | "desc";
  setSortByDate: (value: "asc" | "desc") => void;
  parkingFilter: string | null;
  setParkingFilter: (value: string | null) => void;
};

const dropdownStyle =
  "absolute mt-2 bg-white dark:bg-gray-800 shadow-md rounded-md w-48 z-10";

const EventFilter: React.FC<Props> = ({
  search,
  setSearch,
  ageFilter,
  setAgeFilter,
  sortByDate,
  setSortByDate,
  parkingFilter,
  setParkingFilter,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
      {/* Поисковая строка */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-64 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:outline-none"
      />

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3 relative">
        {/* Age Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("age")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Age restriction <ChevronDown size={16} />
          </button>
          {openDropdown === "age" && (
            <div className={dropdownStyle}>
              {["18+", "21+", "All ages"].map((age) => (
                <button
                  key={age}
                  onClick={() => {
                    setAgeFilter(ageFilter === age ? null : age);
                    setOpenDropdown(null);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    ageFilter === age ? "bg-gray-200 dark:bg-gray-600 font-medium" : ""
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Sort Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("date")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Sort by date <ChevronDown size={16} />
          </button>
          {openDropdown === "date" && (
            <div className={dropdownStyle}>
              {[
                { label: "Oldest first", value: "asc" },
                { label: "Newest first", value: "desc" },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => {
                    setSortByDate(value as "asc" | "desc");
                    setOpenDropdown(null);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    sortByDate === value ? "bg-gray-200 dark:bg-gray-600 font-medium" : ""
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Parking Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("parking")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Parking <ChevronDown size={16} />
          </button>
          {openDropdown === "parking" && (
            <div className={dropdownStyle}>
              {[
                { label: "Free parking", value: "Free parking" },
                { label: "Paid parking", value: "Paid parking" },
                { label: "No parking options", value: "No parking options" },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => {
                    setParkingFilter(parkingFilter === value ? null : value);
                    setOpenDropdown(null);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    parkingFilter === value ? "bg-gray-200 dark:bg-gray-600 font-medium" : ""
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
