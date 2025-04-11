"use client";

import React, { useMemo, useState } from "react";
import { useFetchAllEventsQuery } from "@/redux/userApi/createeventsApi";
import EventCard from "./EventsCard";
import { Timestamp } from "firebase/firestore";
import EventFilter from "./EventFilter";

const EventsAll = () => {
  const { data: events, isLoading } = useFetchAllEventsQuery();

  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState<string | null>(null);
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("asc");
  const [parkingFilter, setParkingFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const eventsPerPage = 6;

  const normalizeDate = (input: Date | Timestamp): Date =>
    input instanceof Timestamp ? input.toDate() : input;

  const filteredEvents = useMemo(() => {
    if (!events) return [];

    const result = events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
      const matchesAge = ageFilter ? event.allowedAge === ageFilter : true;
      const matchesParking = parkingFilter ? event.parkingOption === parkingFilter : true;
      return matchesSearch && matchesAge && matchesParking;
    });

    result.sort((a, b) => {
      const dateA = normalizeDate(a.dateinfo.date);
      const dateB = normalizeDate(b.dateinfo.date);
      return sortByDate === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    return result;
  }, [events, search, ageFilter, sortByDate, parkingFilter]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    return filteredEvents.slice(startIndex, startIndex + eventsPerPage);
  }, [filteredEvents, currentPage]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <EventFilter
        search={search}
        setSearch={setSearch}
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
        sortByDate={sortByDate}
        setSortByDate={setSortByDate}
        parkingFilter={parkingFilter}
        setParkingFilter={setParkingFilter}
      />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {paginatedEvents.map((event) => (
          <EventCard key={event.uid} event={event} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded transition-colors duration-200 text-sm font-medium ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsAll;
