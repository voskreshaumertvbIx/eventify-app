// store/eventStore.ts
import { create } from "zustand";
import { Event } from "@/interfaces";
import { persist } from "zustand/middleware";

interface EventState {
  events: Event[];
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
}

export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      events: [],
      setEvents: (events) => set({ events }),
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
    }),
    {
      name: "event-store",
    }
  )
);
