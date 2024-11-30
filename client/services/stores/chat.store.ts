import { create } from "zustand";
import { PrivateChat, MessageType } from "../../types/chat.types";
import { User } from "../../types/user.types";

type ChatStore = {
  selectedChatId: string;
  chatInfo?: PrivateChat;
  recentChats: PrivateChat[];
  chatWith?: User;
  messages: MessageType[];
  setSelectedChatId: (state: string) => void;
  setChatInfo: (state?: PrivateChat) => void;
  setRecentChats: (state: PrivateChat[]) => void;
  setChatWith: (state: User) => void;
  setMessages: (state: MessageType[]) => void;
  addMessage: (newMessage: MessageType) => void;
};

const useChatStore = create<ChatStore>((set) => ({
  selectedChatId: "",
  chatInfo: undefined,
  recentChats: [],
  chatWith: undefined,
  messages: [],

  setSelectedChatId: (state) => set({ selectedChatId: state }),

  setChatInfo: (state) => set({ chatInfo: state }),

  setRecentChats: (state) => set({ recentChats: state }),

  setChatWith: (state) => set({ chatWith: state }),

  setMessages: (state) => set({ messages: state }),

  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
    })),
}));

export default useChatStore;
