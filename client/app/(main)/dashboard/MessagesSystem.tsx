"use client";
import { useEffect, useRef } from "react";
import { useGetMessages } from "@/services/queries/chat.query";
import { CircularProgress, Divider } from "@mui/material";
import { receiveMessage } from "@/api/messages.api";
import { socket } from "@/app/socket";
import { ChatMessage } from "@/_components";
import { groupMessagesByDay } from "@/utils/time";
import useChatStore from "@/services/stores/chat.store";

import styles from "./index.module.css";

export const MessagesSystem = () => {
  const messages = useChatStore((state) => state.messages);
  const { isLoading } = useGetMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    receiveMessage(socket);

    return () => {
      socket.off("message_sent");
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const groupedMessages = groupMessagesByDay(messages);

  return (
    <>
      {isLoading ? (
        <div className={styles.centerLoading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className={styles.messagesContainer}>
          {Object.entries(groupedMessages).map(([dayLabel, msgs]) => (
            <div key={dayLabel}>
              <Divider className={styles.dayLabel}>
                <span>{dayLabel}</span>
              </Divider>
              {msgs.map((message, index) => {
                const isLastInStack =
                  index === msgs.length - 1 ||
                  msgs[index + 1].initiatedBy !== message.initiatedBy;

                return (
                  <ChatMessage
                    key={message._id}
                    message={message}
                    isLastInStack={isLastInStack}
                  />
                );
              })}
            </div>
          ))}
          <span ref={messagesEndRef}></span>
        </div>
      )}
    </>
  );
};
