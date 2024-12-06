import { AppUser } from '@/interfaces';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  user: AppUser | null;
  isInitialized: boolean; 
  setUser: (user: AppUser | null) => void;
  setInitialized: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isInitialized: false, 
      setUser: (user) => set({ user }),
      setInitialized: (value) => set({ isInitialized: value }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setInitialized(true); 
        }
      },
    }
  )
);
