import { create } from "zustand";

type AuthStore = {
  accessToken: string | null;
  setAccessToken: (value: string | null) => void;
};
const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  setAccessToken: (value: string | null) => {
    set({ accessToken: value });
  },
}));

export default useAuthStore;
