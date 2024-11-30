import { SubjectProps } from "@/types/props.types";
import { timestamp } from "@/utils/time";
import Image from "next/image";
import { useFindChat } from "@/services/queries/chat.query";
import useMobileStore from "@/services/stores/mobile.store";
import useChatStore from "@/services/stores/chat.store";
import useUserStore from "@/services/stores/user.store";

import styles from "./index.module.css";

const RecentChat = ({ subject, lastMessage }: SubjectProps) => {
  const setChatWith = useChatStore((state) => state.setChatWith);
  const setMobileChats = useMobileStore((state) => state.setMobileChats);
  const currentUser = useUserStore((state) => state.user);
  const { content, createdAt, initiatedBy } = lastMessage;
  const { profilePicture, displayName } = subject;
  const isSentByCurrentUser = initiatedBy._id === currentUser?._id;
  useFindChat();

  const handleSelectChatId = () => {
    setChatWith(subject);
    setMobileChats(false);
  };
  return (
    <main className={styles.subjectMain} onClick={handleSelectChatId}>
      <div className={styles.subjectInfo}>
        <Image
          height={48}
          width={48}
          className={styles.friendPpContainer}
          src={profilePicture}
          alt={displayName}
        />
        <div className={styles.messegeInfo}>
          <section className={styles.top}>
            <label>{displayName}</label>
            <p className={styles.lastMessageTime}>{timestamp(createdAt)}</p>
          </section>
          <section className={styles.bottom}>
            <p className={styles.lastMassege}>
              {isSentByCurrentUser ? <span>You: </span> : null}
              {content}
            </p>
            {/* <p className="notification-icon"></p> */}
          </section>
        </div>
      </div>
    </main>
  );
};

export default RecentChat;
