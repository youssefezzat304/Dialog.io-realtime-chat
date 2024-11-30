import { sendMessage } from "@/api/messages.api";
import { socket } from "@/app/socket";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import AttachBtn from "../../Button/AttachBtn";
import VoiceNoteBtn from "../../Button/VoiceNoteBtn";
import SendMessageBtn from "../../Button/SendMessageBtn";
import EmojiPickerBtn from "../../Button/EmojiPickerBtn";
import useChatStore from "@/services/stores/chat.store";
import useUserStore from "@/services/stores/user.store";

import styles from "./index.module.css";

const MessageInput = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const chatId = useChatStore((state) => state.selectedChatId);
  const chatWith = useChatStore((state) => state.chatWith);
  const currentUser = useUserStore((state) => state.user);
  const message = watch("message");

  const handleSendMessage = useCallback(
    async (data: any) => {
      reset();
      try {
        await sendMessage(socket, {
          chatId: chatId,
          initiatedBy: currentUser!._id,
          receivedBy: chatWith!._id,
          content: data.message,
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },
    [chatId, chatWith, reset, currentUser],
  );
  const handleEmojiSelect = (emoji: any) => {
    setValue("message", message + emoji.native, { shouldValidate: true });
  };
  return (
    <form
      autoComplete="off"
      className={styles.inputBox}
      onSubmit={handleSubmit(handleSendMessage)}
    >
      <AttachBtn />
      <EmojiPickerBtn onEmojiSelect={handleEmojiSelect} />
      <VoiceNoteBtn />
      <SendMessageBtn
        onClick={handleSubmit(handleSendMessage)}
        className={styles.sendIcon}
        iconClass={!message ? styles.sendIcon : styles.sendActive}
      />
      <input
        {...register("message")}
        type="text"
        title="message"
        placeholder="Your message."
      />
    </form>
  );
};

export default MessageInput;
