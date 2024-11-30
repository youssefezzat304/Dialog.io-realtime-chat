"use client";
import { findChat, getAllChats } from "@/api/chat.api";
import { useQuery } from "@tanstack/react-query";
import {
  getMessages,
  joinPrivateChat,
  leavePrivateChat,
} from "@/api/messages.api";
import { useEffect, useState } from "react";
import { socket } from "@/app/socket";
import { PrivateChat } from "@/types/chat.types";
import { db } from "../../utils/indexedDB";
import useUserStore from "../stores/user.store";
import useChatStore from "../stores/chat.store";

export const useGetChats = () => {
  const currentUser = useUserStore((state) => state.user);
  const setRecentChats = useChatStore((state) => state.setRecentChats);
  const [cachedChats, setCachedChats] = useState<PrivateChat[] | null>(null);

  useEffect(() => {
    const fetchCachedChats = async () => {
      try {
        const chats = await db.recentChatsDB.toArray();
        if (chats && chats.length > 0) {
          setCachedChats(chats);
          setRecentChats(chats);
        }
      } catch (error) {
        console.error("Failed to fetch chats from IndexedDB:", error);
      }
    };

    fetchCachedChats();
  }, [setRecentChats]);

  if (!currentUser) throw new Error("No current User");

  const queryOptions = {
    queryFn: () => getAllChats(currentUser._id),
    queryKey: ["allChats"],
    enabled: !cachedChats || cachedChats.length === 0,
  };
  const {
    data: allChats,
    isLoading,
    isError,
    error,
  } = useQuery<PrivateChat[] | undefined>(queryOptions);

  useEffect(() => {
    const handleChats = async (fetchedChats: PrivateChat[] | undefined) => {
      if (fetchedChats) {
        setRecentChats(fetchedChats);
        try {
          await db.recentChatsDB.bulkPut(fetchedChats);
        } catch (error) {
          console.error("Failed to store chats in IndexedDB:", error);
        }
      }
    };

    handleChats(allChats);
  }, [allChats, setRecentChats, isError, error, isLoading]);

  return { isLoading };
};

export const useFindChat = () => {
  const currentUser = useUserStore((state) => state.user);
  const chatWith = useChatStore((state) => state.chatWith);
  const setSelectedChatId = useChatStore((state) => state.setSelectedChatId);
  const selectedChatId = useChatStore((state) => state.selectedChatId);

  const { data: currentChat, isLoading } = useQuery({
    queryFn: async () => {
      if (currentUser && chatWith) {
        const data = await findChat({
          userId: currentUser._id,
          chatterId: chatWith._id,
        });
        return data;
      }
    },
    queryKey: ["currentChat", chatWith],
    enabled: !!chatWith,
  });
  useEffect(() => {
    if (currentChat) {
      setSelectedChatId(currentChat.data._id);
    }
  }, [setSelectedChatId, currentChat, selectedChatId, currentUser]);

  return { currentChat, isLoading };
};

export const useGetMessages = () => {
  const setMessages = useChatStore((state) => state.setMessages);
  const selectedChatId = useChatStore((state) => state.selectedChatId);
  const currentUser = useUserStore((state) => state.user);

  const { data: allMessages, isLoading } = useQuery({
    queryFn: () => getMessages(selectedChatId),
    queryKey: ["allMessages", selectedChatId],
    enabled: !!selectedChatId,
  });
  useEffect(() => {
    if (allMessages) {
      setMessages(allMessages.data);
    }
  }, [allMessages, setMessages]);

  useEffect(() => {
    if (!currentUser || !selectedChatId) return;

    joinPrivateChat(socket, {
      chatId: selectedChatId,
      userId: currentUser._id,
    });

    return () => {
      leavePrivateChat(socket, {
        chatId: selectedChatId,
        userId: currentUser._id,
      });
    };
  }, [selectedChatId, currentUser]);

  return { allMessages, isLoading };
};
