"use client";
import { useMemo } from "react";
import SearchBar from "../../common/Search/FriendsSearch";
import RecentChat from "../../common/Entities/RecentChat";
import EmptyChats from "../../SVGs/emptyChats";
import { useGetChats } from "@/services/queries/chat.query";
import { PrivateChat } from "@/types/chat.types";
import { CircularProgress } from "@mui/material";
import useUserStore from "@/services/stores/user.store";
import useChatStore from "@/services/stores/chat.store";

import styles from "./index.module.css";

const Chats = () => {
  const recentChats = useChatStore((state) => state.recentChats);

  const currentUser = useUserStore((state) => state.user);
  const { isLoading } = useGetChats();

  const filteredChats = useMemo(() => {
    return recentChats?.map((chat: PrivateChat) => {
      const subject =
        chat.participants[0]._id !== currentUser?._id
          ? chat.participants[0]
          : chat.participants[1];
      return (
        <RecentChat
          key={subject._id}
          subject={subject}
          lastMessage={chat.lastMessage}
        />
      );
    });
  }, [recentChats, currentUser]);

  if (isLoading) {
    return (
      <div className={styles.centerLoading}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <section className={styles.friendListMain}>
      <SearchBar />
      {recentChats.length === 0 ? (
        <EmptyChats />
      ) : (
        <div className={styles.friendList}>{filteredChats}</div>
      )}
    </section>
  );
};

export default Chats;
