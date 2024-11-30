import { create } from "zustand";

type MobileStore = {
  mobileChats: boolean;
  setMobileChats: (state: boolean) => void;
};
const useMobileStore = create<MobileStore>((set) => ({
  mobileChats: false,
  setMobileChats: (state) => {
    set({ mobileChats: state });
  },
}));

export default useMobileStore;
