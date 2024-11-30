import { AxiosResponse } from "axios";
import { PrivateChat, MessageType } from "../types/chat.types";
import { User } from "../types/user.types";

export const isUser = (obj: any): obj is User => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj._id === "string" &&
    typeof obj.displayName === "string" &&
    typeof obj.email === "string" &&
    typeof obj.country === "string" &&
    obj.profilePic !== undefined &&
    typeof obj.city === "string" &&
    typeof obj.postalCode === "string" &&
    typeof obj.birthDate === "string" &&
    typeof obj.phoneNumber === "string" &&
    typeof obj.status === "string" &&
    Array.isArray(obj.friends) &&
    obj.friends.every((friend: any) => isUser(friend)) &&
    Array.isArray(obj.friendRequestsSent) &&
    obj.friendRequestsSent.every((req: any) => isFriendRequest(req)) &&
    Array.isArray(obj.friendRequestsReceived) &&
    obj.friendRequestsReceived.every((req: any) => isFriendRequest(req)) &&
    obj.chats !== undefined
  );
};

export const isFriendRequest = (
  obj: any,
): obj is { displayName: string; _id: string } => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.displayName === "string" &&
    typeof obj._id === "string"
  );
};
export const isMessage = (obj: any): obj is MessageType => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj._id === "string" &&
    typeof obj.chatId === "string" &&
    typeof obj.senderId === "string" &&
    typeof obj.content === "string" &&
    typeof obj.createdAt === "string" &&
    typeof obj.updatedAt === "string"
  );
};
export const isPrivateChat = (obj: any): obj is PrivateChat => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj._id === "string" &&
    Array.isArray(obj.participants) &&
    obj.participants.every((participant: any) => isUser(participant)) &&
    isMessage(obj.lastMessage) &&
    (obj.type === "private" || obj.type === "group") &&
    typeof obj.createdAt === "string" &&
    typeof obj.updatedAt === "string"
  );
};
export function isChatArray(
  response: AxiosResponse<any>,
): response is AxiosResponse<PrivateChat[]> {
  return (
    Array.isArray(response.data) &&
    response.data.every((item) => isPrivateChat(item))
  );
}
