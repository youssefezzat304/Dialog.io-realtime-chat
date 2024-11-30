"use client";
import { NavBar, RoutesLoading } from "@/_components";
import useMediaQuery from "@/hooks/useMediaQuery";
import useAuthenticateUser from "@/hooks/useAuthenticateUser";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import useUserStore from "@/services/stores/user.store";

import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socketRef = useRef<Socket | null>(null);
  const user = useUserStore((state) => state.user);
  const { isLoading } = useAuthenticateUser();
  const { isTablet } = useMediaQuery();

  useEffect(() => {
    if (!socketRef.current) {
      const newSocket = io("http://localhost:3000", {
        withCredentials: true,
      });

      socketRef.current = newSocket;

      newSocket.on("connect", () => {
        console.log("connected");
      });

      return () => {
        newSocket.disconnect();
        socketRef.current = null;
      };
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  if (!user || isLoading) {
    return <RoutesLoading />;
  }
  return (
    <main className={styles.main}>
      {!isTablet && <NavBar />}
      {children}
    </main>
  );
}
