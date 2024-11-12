import { create } from 'zustand';

interface BusinessProfile {
  name: string;
  description: string;
  logo: string;
  rating: number;
  reviews: number;
  sentiment: number;
  views: number;
}

interface BusinessState {
  profile: BusinessProfile | null;
  setProfile: (profile: BusinessProfile) => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));