import { ReactElement } from "react";

export type ChatType = {
  id: number | undefined;
  sender: string;
  senderId: number;
  isYou: boolean;
  message: string;
  timestamp: string;
};

export type ChatListType = {
  id: number | undefined;
  name: string;
  lastSender: string | null | undefined;
  lastMessage: string;
  timestamp: string;
  newNotification: boolean;
  participants: number | null;
  conversations: ChatType[] | null;
  avatar: ReactElement;
};
