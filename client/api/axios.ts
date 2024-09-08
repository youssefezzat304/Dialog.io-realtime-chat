import axios, { AxiosResponse } from "axios";
import { User } from "../types/user.types";
import { decode } from "jsonwebtoken";

const orginURL = process.env.NEXT_PUBLIC_API_HOST;

export const api = axios.create({
  baseURL: orginURL,
});

export const axiosPrivate = axios.create({
  baseURL: orginURL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

export const setupInterceptors = (accessToken: string | null) => {
  const requestIntercept = axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
  const responseIntercept = axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    },
  );
  return { requestIntercept, responseIntercept };
};

export const cleanupInterceptors = (interceptors: {
  requestIntercept: number;
  responseIntercept: number;
}) => {
  axiosPrivate.interceptors.request.eject(interceptors.requestIntercept);
  axiosPrivate.interceptors.response.eject(interceptors.responseIntercept);
};

export const getUserInfo = async (): Promise<User | null> => {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const user = decode(token) as User;
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

export const getAccessToken = async () => {
  try {
    const response = await api.post("/sessions/refresh", null, {
      withCredentials: true,
    });
    const accessToken = response.data.accessToken;

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
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

export const sendProfilePic = async (profilePic: any, requester: any) => {
  const formData = new FormData();
  formData.append("profilePic", profilePic);
  formData.append("requester", requester);
  try {
    const response = await api.post("/upload/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
