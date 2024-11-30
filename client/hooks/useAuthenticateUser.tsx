"use client";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, goOnline } from "../api/axios";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/types/user.types";
import useUserStore from "@/services/stores/user.store";
import { db } from "@/utils/indexedDB";
import { socket } from "@/app/socket";

const useAuthenticateUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setUser);
  const [initialUser, setInitialUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setInitialUser(parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        setInitialUser(null);
      }
    } else {
      setInitialUser(null);
    }
  }, [setUser]);

  const { data: currentUser, isLoading } = useQuery({
    queryFn: () => getUserInfo(),
    queryKey: ["currentUser"],
    enabled: !initialUser,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const isRegisterPage = pathname === "/register";
    if (!isLoading) {
      if (!currentUser) {
        localStorage.clear();
        db.recentChatsDB.clear();
        queryClient.removeQueries({
          queryKey: ["currentUser"],
          exact: true,
        });
        setUser(null);
        router.push("/register");
      }
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        goOnline(currentUser!._id, socket);
        if (isRegisterPage) {
          router.push("/dashboard");
        }
      }
    }
  }, [currentUser, isLoading, router, initialUser, setUser]);

  return { isLoading, initialUser };
};

export default useAuthenticateUser;
