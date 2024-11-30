import PrivateChat from "../PrivateChat";
import useMediaQuery from "@/hooks/useMediaQuery";
import Chats from "@/_components/List/Chats";
import useChatStore from "@/services/stores/chat.store";

import styles from "./index.module.css";

const Chat = () => {
  const chatWith = useChatStore((state) => state.chatWith);
  const { isMobile, isSmallTab } = useMediaQuery();
  const largeScreen = !isMobile && !isSmallTab;

  const NoMessages = () => {
    return (
      <div className={styles.noMessages}>
        <strong>No new messages.</strong>
        <p>Start new conversation.</p>
      </div>
    );
  };
  return (
    <div className={styles.chatMain}>
      {!chatWith && largeScreen ? (
        <NoMessages />
      ) : !chatWith && !largeScreen ? (
        <Chats />
      ) : (
        <PrivateChat />
      )}
    </div>
  );
};

export default Chat;
