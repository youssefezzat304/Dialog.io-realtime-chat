import axios, { AxiosResponse } from "axios";
import { User } from "../types/user.types";
import { Socket } from "socket.io-client";
import { socket } from "@/app/socket";

const orginURL = process.env.NEXT_PUBLIC_API_HOST;

export const api = axios.create({
  baseURL: orginURL,
});

export const axiosPrivate = axios.create({
  baseURL: orginURL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

export const getUserInfo = async (): Promise<User | null> => {
  try {
    const response = await api.post("/auth/refresh", null, {
      withCredentials: true,
    });
    const user = response.data.user;

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

export const updateInfo = async (
  data: any,
): Promise<AxiosResponse<User> | null> => {
  try {
    const response = api.patch("/users/update-info", data);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendProfilePic = async (profilePic: any, requester: string) => {
  const formData = new FormData();
  formData.append("profilePicture", profilePic);
  formData.append("requesterId", requester);
  try {
    const response = await api.post("/upload/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    console.error(error);
  }
};

export const deleteProfilePic = async (userId: string | undefined) => {
  const data = {
    userId: userId,
  };
  try {
    const response = (await api.patch(
      "/upload/delete-profile-picture",
      data,
    )) as AxiosResponse<User>;
    return response.data;
  } catch (error: unknown) {
    console.error(error);
  }
};

export const isRefreshTokenValid = async () => {
  try {
    const response = await axiosPrivate.get("/auth/validate-token");

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking refresh token:", error);
    return false;
  }
};

export function goOnline(userId: string, socket: Socket) {
  socket.emit("userOnline", userId);
}

socket.on("updateOnlineStatus", (onlineUsers) => {
  console.log("Online Users:", onlineUsers);
});
