import { MessageType } from "@/types/chat.types";
import dayjs from "dayjs";

export const messageTimestamp = (timestamp?: string) => {
  const today = dayjs();
  const givenDate = dayjs(timestamp);

  if (today.isSame(givenDate, "day")) {
    return givenDate.format("hh:mm A");
  } else {
    return givenDate.format("DD/MM/YY hh:mm A");
  }
};

export const timestamp = (timestamp?: string) => {
  if (!timestamp) return "";

  const now = dayjs();
  const givenDate = dayjs(timestamp);
  const differenceInMinutes = now.diff(givenDate, "minute");
  const differenceInHours = now.diff(givenDate, "hour");
  const differenceInDays = now.diff(givenDate, "day");

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}m`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours}h`;
  } else if (differenceInDays === 1) {
    return "Yesterday";
  } else if (differenceInDays < 7) {
    return givenDate.format("dddd");
  } else {
    return givenDate.format("DD/MM/YY hh:mm A");
  }
};

export const getDayLabel = (timestamp: string) => {
  const now = dayjs();
  const givenDate = dayjs(timestamp);
  const startOfToday = now.startOf("day");
  const differenceInDays = now.diff(givenDate, "day");

  if (givenDate.isAfter(startOfToday)) {
    return "Today";
  } else if (
    givenDate.isAfter(startOfToday.subtract(1, "day")) &&
    givenDate.isBefore(startOfToday)
  ) {
    return "Yesterday";
  } else if (differenceInDays < 7) {
    return givenDate.format("dddd");
  } else {
    return givenDate.format("DD/MM/YYYY");
  }
};

interface GroupedMessages {
  [key: string]: MessageType[];
}
export const groupMessagesByDay = (
  messages: MessageType[],
): GroupedMessages => {
  return messages.reduce((acc: GroupedMessages, message) => {
    const dayLabel = getDayLabel(message.createdAt);

    if (!acc[dayLabel]) {
      acc[dayLabel] = [];
    }

    acc[dayLabel].push(message);
    return acc;
  }, {});
};
