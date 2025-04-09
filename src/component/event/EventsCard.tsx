/* eslint-disable @typescript-eslint/no-explicit-any */
import { Event } from "@/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Props {
  event: Event;
}

const EventCard = ({ event }: Props) => {
  const [creatorName, setCreatorName] = useState("Loading...");
  const [cityName, setCityName] = useState("Loading location...");

  const fetchCityNameFromCoords = async (
    lat: number,
    lon: number,
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      );
      if (!response.ok) throw new Error("Failed to fetch city name");

      const data = await response.json();
      const city =
        data?.address?.city ||
        data?.address?.town ||
        data?.address?.village ||
        data?.address?.state;

      return city || "Unknown location";
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return "Unknown location";
    }
  };
  const formatEventDate = (date: any): string => {
    if (!date) return "Invalid date";
    try {
      if (typeof date === 'object' && 'toDate' in date) {
        return date.toDate().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      } 
      return "Invalid date";
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  useEffect(() => {
    const fetchCreatorName = async () => {
      if (!event.createdby) return;
      const docRef = doc(db, "users", event.createdby);
      const snapshot = await getDoc(docRef);
      const userData = snapshot.data();
      setCreatorName(userData?.name || "Unknown");
    };
    fetchCreatorName();
  }, [event.createdby]);

  useEffect(() => {
    if (event.location?.lat && event.location?.lon) {
      fetchCityNameFromCoords(event.location.lat, event.location.lon).then(
        setCityName,
      );
    }
  }, [event.location.lat, event.location.lon]);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
      <Image
        src={event.image.url}
        alt={event.title}
        width={400}
        height={200}
        className="h-48 w-full rounded-xl object-cover"
      />
      <h2 className="mt-2 text-xl font-semibold dark:text-white">
        {event.title}
      </h2>
      <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
        {event.description}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        📍 Location: {cityName}
      </p>

      <p className="text-sm dark:text-gray-400">
  📅 {formatEventDate(event.dateinfo.date)} ⏰ {event.dateinfo.start} - {event.dateinfo.end}
</p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        👤 Created by: {creatorName}
      </p>

      {"allowedAge" in event && (
        <p className="text-sm text-red-500">
          Age Restriction: {(event as any).allowedAge}+
        </p>
      )}

      {"parkingOption" in event && (
        <p className="text-sm text-green-600">
          🚗 Parking: {(event as any).parkingOption}
        </p>
      )}

      {"timeBeforeType" in event && "timebefore" in event && (
        <p className="text-sm">
          ⏳ Reminder: {(event as any).timebefore}{" "}
          {(event as any).timeBeforeType} before
        </p>
      )}
    </div>
  );
};

export default EventCard;
