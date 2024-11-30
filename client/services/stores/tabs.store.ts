import { create } from "zustand";

type TabState = {
  isOpen: boolean;
};

type TabsStore = {
  notificationsTab: TabState;
  friendRequestsTab: TabState;
  friendsTab: boolean;
  chatsTab: boolean;
  chatInfoTab: boolean;
  membersTab: boolean;
  toggleTab: (tab: "notificationsTab" | "friendRequestsTab") => void;
  openTab: (
    tab: "friendsTab" | "chatsTab" | "notificationsTab" | "friendRequestsTab"
  ) => void;
  setChatInfo: (state: boolean) => void;
  setFriendsTab: (state: boolean) => void;
  setMembersTab: (state: boolean) => void;
  closeTabs: () => void;
};

const useTabsStore = create<TabsStore>((set) => ({
  notificationsTab: { isOpen: false },
  friendRequestsTab: { isOpen: false },
  friendsTab: false,
  chatsTab: true,
  chatInfoTab: false,
  membersTab: false,

  toggleTab: (tab) =>
    set((state) => ({
      notificationsTab: {
        isOpen:
          tab === "notificationsTab" ? !state.notificationsTab.isOpen : false,
      },
      friendRequestsTab: {
        isOpen:
          tab === "friendRequestsTab" ? !state.friendRequestsTab.isOpen : false,
      },
    })),

  openTab: (tab) =>
    set(() => {
      if (tab === "friendsTab" || tab === "chatsTab") {
        return {
          friendsTab: tab === "friendsTab",
          chatsTab: tab === "chatsTab",
        };
      }
      return {
        notificationsTab: { isOpen: tab === "notificationsTab" },
        friendRequestsTab: { isOpen: tab === "friendRequestsTab" },
      };
    }),

  setChatInfo: (state) => set({ chatInfoTab: state }),
  setFriendsTab: (state) => set({ friendsTab: state }),
  setMembersTab: (state) => set({ membersTab: state }),

  closeTabs: () =>
    set({
      notificationsTab: { isOpen: false },
      friendRequestsTab: { isOpen: false },
    }),
}));

export default useTabsStore;
