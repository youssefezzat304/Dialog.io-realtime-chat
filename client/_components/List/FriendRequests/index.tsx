"use client";
import { Panel, PanelGroup } from "react-resizable-panels";
import NotificationsHeader from "../../Header/NotificationsHeader";
import useUserStore from "@/services/stores/user.store";
import { List } from "@mui/material";
import { FriendRequestNotification } from "../..";
import { useEffect, useState } from "react";
import emptyFriendRequests from "@/public/assets/no-friend-requests.svg";
import Image from "next/image";

import styles from "./index.module.css";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState<
    Array<{ displayName: string; _id: string }> | null | undefined
  >(null);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setFriendRequests(user.friendRequests.incoming);
      console.log(user);
    }
  }, [user]);

  return (
    <PanelGroup direction="vertical" className={styles.main}>
      <Panel className={styles.container}>
        <NotificationsHeader />
        {!friendRequests?.length ? (
          <>
            <div className={styles.emptyFriendRequests}>
              <strong>No new friend requests.</strong>
              <Image
                width={300}
                height={300}
                src={emptyFriendRequests}
                alt="empty-friend-requests"
              />
            </div>
          </>
        ) : null}
        <List className={styles.listOfNotifications}>
          {friendRequests?.map((request, index) => {
            return (
              <FriendRequestNotification
                key={index}
                request={request}
                recipientId={user?._id}
                requesterId={request._id}
              />
            );
          })}
        </List>
      </Panel>
    </PanelGroup>
  );
};

export default FriendRequests;
