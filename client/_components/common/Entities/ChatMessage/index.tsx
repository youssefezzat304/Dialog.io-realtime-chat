import { MessageType } from "@/types/chat.types";
import { memo } from "react";
import { messageTimestamp } from "@/utils/time";
import Image from "next/image";
import useUserStore from "@/services/stores/user.store";

import styles from "./index.module.css";

interface ChatMessageProps {
  message: MessageType;
  isLastInStack: boolean;
}

const ChatMessage = memo(({ message, isLastInStack }: ChatMessageProps) => {
  const { content, createdAt, initiatedBy, receivedByType } = message;
  const currentUser = useUserStore((state) => state.user);
  const isSentByCurrentUser = initiatedBy._id === currentUser?._id;

  return (
    <div
      className={`${styles.messageContainer} ${
        isSentByCurrentUser
          ? `${styles.sent}`
          : `${isLastInStack ? styles.receivedLast : styles.received}`
      }`}
    >
      {!isSentByCurrentUser && isLastInStack && (
        <Image
          width={48}
          height={48}
          src={initiatedBy.profilePicture}
          alt="Profile Picture"
          className={styles.messageProfilePic}
        />
      )}
      <div
        className={`${styles.messageBubble} ${
          isSentByCurrentUser ? `${styles.sent}` : `${styles.received}`
        }`}
      >
        {!isSentByCurrentUser && receivedByType === "group" && (
          <strong>{initiatedBy.displayName}</strong>
        )}
        <p>{content}</p>
        <p className={styles.mssgTime}>{messageTimestamp(createdAt)}</p>
      </div>
    </div>
  );
});
ChatMessage.displayName = "Message";

export default ChatMessage;
