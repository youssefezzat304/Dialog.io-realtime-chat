import { create } from "zustand";

type TabletStore = {
  tabletNavBar: boolean;
  setTabletNavBar: (state: boolean) => void;
};
const useTabletStore = create<TabletStore>((set) => ({
  tabletNavBar: false,
  setTabletNavBar: (state) => {
    set({ tabletNavBar: state });
  },
}));

export default useTabletStore;
