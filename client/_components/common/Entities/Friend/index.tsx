import { User } from "@/types/user.types";
import Image from "next/image";
import { useFindChat } from "@/services/queries/chat.query";
import useChatStore from "@/services/stores/chat.store";

import styles from "./index.module.css";

const Friend = ({ friend }: { friend: User }) => {
  const setChatWith = useChatStore((state) => state.setChatWith);
  const { profilePicture, displayName } = friend;
  useFindChat();

  const handleSelectChatId = () => {
    setChatWith(friend);
  };
  return (
    <div
      className={`${styles.subjectMain} ${styles.friend}`}
      onClick={handleSelectChatId}
    >
      <Image
        height={48}
        width={48}
        className={styles.profilePic}
        src={profilePicture}
        alt={displayName}
      />
      <section className={styles.friendName}>
        <label htmlFor="">{displayName}</label>
      </section>
    </div>
  );
};

export default Friend;
