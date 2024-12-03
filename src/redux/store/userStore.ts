import { AppUser } from '@/interfaces';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null, 
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-store', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
