/* eslint-disable @typescript-eslint/no-explicit-any */

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Event } from "@/interfaces";

import {
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    createEvent: builder.mutation<Event, Event>({
      async queryFn(eventData) {
        try {
          const eventsCollection = collection(db, "events");
          const newDocRef = doc(eventsCollection); 
          const newEvent: Event = {
            ...eventData,
            uid: newDocRef.id,
          };

          await setDoc(newDocRef, {
            ...newEvent,
            timestamp: serverTimestamp(),
          });

          return { data: newEvent };
        } catch (err: any) {
          return {
            error: { status: 500, data: err.message || "Failed to create event" },
          };
        }
      },
    }),

    fetchAllEvents: builder.query<Event[], void>({
      async queryFn() {
        try {
          const snapshot = await getDocs(collection(db, "events"));
          const events: Event[] = snapshot.docs.map((doc) => doc.data() as Event);
          return { data: events };
        } catch (err: any) {
          return {
            error: { status: 500, data: err.message },
          };
        }
      },
    }),
  }),
});

export const { useCreateEventMutation, useFetchAllEventsQuery } = eventApi;
