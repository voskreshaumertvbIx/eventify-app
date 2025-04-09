"use client";

import React, { useMemo, useState } from "react";
import { useFetchAllEventsQuery } from "@/redux/userApi/createeventsApi";
import EventCard from "./EventsCard";


const EventsAll = () => {
  const { data: events, isLoading } = useFetchAllEventsQuery();
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const eventsPerPage = 6;

  const filteredEvents = useMemo(() => {
    if (!events) return [];

    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
      const matchesAge = ageFilter ? event.allowedAge === ageFilter : true;
      return matchesSearch && matchesAge;
    });
  }, [events, search, ageFilter]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    return filteredEvents.slice(startIndex, startIndex + eventsPerPage);
  }, [filteredEvents, currentPage]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-1/3"
        />

        <select
          value={ageFilter || ""}
          onChange={(e) => setAgeFilter(e.target.value || null)}
          className="px-4 py-2 border rounded w-full sm:w-1/4"
        >
          <option value="">All Ages</option>
          <option value="18+">18+</option>
          <option value="21+">21+</option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
              className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
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
