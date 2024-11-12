import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  accountType: 'personal' | 'business';
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));