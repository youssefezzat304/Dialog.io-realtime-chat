import { MessagesSystem } from "@/app/(main)/dashboard/MessagesSystem";
import MessageInput from "../../common/Input/MessageInput";
import ChatHeaderIcons from "../../Header/ChatHeaderIcons";
import BackBtn from "@/_components/common/Button/BackBtn";
import Chats from "@/_components/List/Chats";
import useMobileStore from "@/services/stores/mobile.store";
import useMediaQuery from "@/hooks/useMediaQuery";
import useChatStore from "@/services/stores/chat.store";

import styles from "./index.module.css";

const PrivateChat = () => {
  const { isSmallTab, isMobile } = useMediaQuery();
  const chatWith = useChatStore((state) => state.chatWith);
  const mobileChats = useMobileStore((state) => state.mobileChats);
  const setMobileChats = useMobileStore((state) => state.setMobileChats);

  const backToChats = () => {
    setMobileChats(true);
  };
  return (
    <>
      {mobileChats && (isMobile || isSmallTab) ? (
        <Chats />
      ) : (
        <>
          <header className={styles.chatHeader}>
            {isSmallTab && (
              <BackBtn onClick={backToChats} className={styles.backBtn} />
            )}
            <div className={styles.headerInfo}>
              <label htmlFor="name">{chatWith?.displayName}</label>
              <p>Online</p>
            </div>
            <ChatHeaderIcons />
          </header>
          <section className={styles.chatConsole}>
            <MessagesSystem />
          </section>
          <section className={styles.chatInput}>
            <MessageInput />
          </section>
        </>
      )}
    </>
  );
};

export default PrivateChat;
