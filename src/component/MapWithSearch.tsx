"use client"
import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useSearchLocationQuery } from "@/redux/userApi/mapApi";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "./reusable/Input";

import { useLocationStore } from "@/redux/store/useLocationStore";

const MapWithSearch: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const setLocation = useLocationStore((state)=> state.setLocation)
  const {
    data: results,
    error,
    isFetching,
  } = useSearchLocationQuery(debouncedSearchQuery, {
    skip: !debouncedSearchQuery.trim(),
  });

  useEffect(() => {
    const loadMaplibre = async () => {
      const maplibregl = await import("maplibre-gl");

      if (mapContainerRef.current) {
        mapRef.current = new maplibregl.Map({
          container: mapContainerRef.current,
          style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
          center: [13.405, 52.52],
          zoom: 8,
        });
      }
    };

    loadMaplibre();
  }, []);

  useEffect(() => {
    if (results && results.length > 0 && mapRef.current) {
      const { lat, lon } = results[0];

      mapRef.current.flyTo({
        center: [parseFloat(lon), parseFloat(lat)],
        zoom: 13,
      });

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = new maplibregl.Marker()
        .setLngLat([parseFloat(lon), parseFloat(lat)])
        .addTo(mapRef.current);

       setLocation(parseFloat(lon), parseFloat(lon));
    }
  }, [results, setLocation]);
 

  return (
    <div>
      <div className="mb-2">
        <Input
          name="location"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Введите адрес"
          className="w-[300px] rounded border border-gray-300 p-2"
        />
        {isFetching && <span className="ml-2 text-blue-500">Searching...</span>}
        {error && <p className="text-red-500">Failed to retrieve data.</p>}
        {!isFetching &&
          !error &&
          debouncedSearchQuery &&
          results?.length === 0 && (
            <p className="text-gray-500">
              No results found for `{debouncedSearchQuery}`.
            </p>
          )}
      </div>

      <div
        ref={mapContainerRef}
        className="h-[220px] w-full border border-gray-300"
      />
    </div>
  );
};

export default MapWithSearch;
