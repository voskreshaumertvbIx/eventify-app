import { LocationState } from '@/interfaces';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';



export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      lat: null,
      lon: null,
      initialized: false,
      setLocation: (lat, lon) => set({ lat, lon }),
      resetLocation: () => set({ lat: null, lon: null }),
      setInitialized: (initialized) => set({ initialized }),
    }),
    {
      name: 'location-store', 
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setInitialized(true);
        }
      },
    }
  )
);
