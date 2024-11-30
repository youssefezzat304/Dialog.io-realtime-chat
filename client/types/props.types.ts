import {
  ComponentProps,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import {
  Control,
  FieldError,
  FieldErrors,
  SubmitHandler,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { User } from "./user.types";
import { MessageType } from "./chat.types";
import { FriendRequestState } from "./friendSystem.types";
import { FriendRequestSchema } from "@/services/validation/friendSystem.validation";

export type AddFriendProps = {
  control: Control<FriendRequestSchema>;
  errors: FieldErrors<FriendRequestSchema>;
  handleClose: MouseEventHandler;
  setIsFriendReqSuccessful: Dispatch<SetStateAction<FriendRequestState>>;
  isFriendReqSuccessful: FriendRequestState;
  clearErrors: UseFormClearErrors<FriendRequestSchema>;
};

export type AddFriendRequestMessagesProps = {
  control: Control<FriendRequestSchema>;
  errors: FieldErrors<FriendRequestSchema>;
  isFriendReqSuccessful: FriendRequestState;
  clear: () => void;
  open: boolean;
};

export type MessageNotificationProps = {
  displayName: string;
  photo: string;
  time: string;
  primaryLabel: string;
  message: string;
  recipientId: string;
  requesterId: string;
  request: any;
};

export type FriendRequestNotificationProps = {
  recipientId?: string;
  requesterId?: string;
  request: any;
};

export type ProfileInfoInputProps = ComponentProps<"input"> & {
  control: UseFormRegisterReturn<string>;
  defaultValue: string | null | undefined;
  errorCondition: FieldError | undefined;
  errorMessage: string | null | undefined;
  label: string;
  holder: string;
  type?: "text" | "number" | "email" | null;
};

export type ImageDisplayProps = ComponentProps<"img"> & {
  base64String: string;
  displayName?: string;
  variant?: "circular" | "rounded" | "square";
};

export type SubjectProps = ComponentProps<"div"> & {
  subject: User;
  lastMessage: MessageType;
};

export type IconProps = ComponentProps<"button"> & {
  title: string;
  icon: ReactNode;
};

export type ProfileFormSectionProps = {
  control: Control<User>;
  handleSubmit: UseFormHandleSubmit<User, undefined>;
  saveChanges: SubmitHandler<User>;
  errors: FieldErrors<User>;
  setValue: UseFormSetValue<User>;
};

export type ProfileLeftSectionProps = {
  control: Control<any>;
  saveChanges: SubmitHandler<User>;
  resetSettings: () => void;
  errors: FieldErrors<User>;
};

export type GenericInputType = {
  icons: any;
  inputProps: ComponentProps<"input">;
  divProps: ComponentProps<"div">;
};
