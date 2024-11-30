import useTabletStore from "@/services/stores/tablet.store";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useEffect } from "react";
import useTabsStore from "@/services/stores/tabs.store";

const useNavBar = () => {
  const {
    openChatsTab,
    openFriendsTab,
    toggleNotifications,
    toggleFriendRequests,
  } = useTabsStore((state) => ({
    openChatsTab: state.openTab,
    openFriendsTab: state.openTab,
    toggleNotifications: state.toggleTab,
    toggleFriendRequests: state.toggleTab,
  }));

  const setTabletNavBar = useTabletStore((state) => state.setTabletNavBar);
  const router = useRouter();
  const { setSystemLoading } = useThemeContext();

  useEffect(() => {
    router.prefetch("/profile");
  }, [router]);

  const handleNotifications = () => {
    toggleNotifications("notificationsTab");
  };
  const handleFriendRequests = () => {
    toggleFriendRequests("friendRequestsTab");
  };
  const gotoChats = () => {
    setTabletNavBar(false);
    openChatsTab("chatsTab");
    router.replace("/dashboard");
  };
  const gotoContacts = () => {
    setTabletNavBar(false);
    openFriendsTab("friendsTab");
    router.replace("/dashboard");
  };
  const gotoProfileSettings = () => {
    setTabletNavBar(false);
    setSystemLoading(true);
    router.replace("/profile");
  };
  return {
    gotoChats,
    gotoContacts,
    gotoProfileSettings,
    handleNotifications,
    handleFriendRequests,
  };
};

export default useNavBar;
