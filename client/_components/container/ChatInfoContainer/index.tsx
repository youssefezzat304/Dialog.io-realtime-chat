"use client";
import { Panel } from "react-resizable-panels";
import ButtonIcon from "@/_components/common/Icon/ButtonIcon";
import { IoClose } from "react-icons/io5";
import ChatInfoUtilities from "../ChatInfo/ChatInfoUtilities.tsx";
import Image from "next/image";
import { chooseRandomAvatar } from "@/utils/avatarSystem";
import useTabsStore from "@/services/stores/tabs.store";
import useUserStore from "@/services/stores/user.store";
import useChatStore from "@/services/stores/chat.store";

import styles from "./index.module.css";

const ChatInfoContainer = () => {
  const setChatInfo = useTabsStore((state) => state.setChatInfo);
  const contact = useChatStore((state) => state.chatWith);

  return (
    <Panel defaultSize={50} minSize={20} className={styles.chatInfoContainer}>
      <header className={styles.header}>
        <span>Contact info</span>
        <ButtonIcon
          title="Close"
          icon={<IoClose />}
          onClick={() => setChatInfo(false)}
        />
      </header>
      <div className={styles.body}>
        <section className={styles.profile}>
          <Image
            height={160}
            width={160}
            className={styles.profilePicture}
            src={contact?.profilePicture!}
            alt="Contact profile picture"
          />
          <span>{contact?.displayName}</span>
        </section>
        <ChatInfoUtilities />
      </div>
    </Panel>
  );
};

export default ChatInfoContainer;
