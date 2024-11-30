import { IoCheckmark, IoClose } from "react-icons/io5";
import dayjs from "dayjs";
import { useHandleFriendRequest } from "@/services/queries/friendRequest.query";
import { FriendRequestNotificationProps } from "@/types/props.types";
import ButtonIcon from "../../Icon/ButtonIcon";
import Image from "next/image";

import styles from "./index.module.css";

const FriendRequestNotification = ({
  request,
  recipientId,
  requesterId,
}: FriendRequestNotificationProps) => {
  const { profilePicture, displayName, createAt } = request;
  const { acceptRequest, rejectRequest } = useHandleFriendRequest();

  const handleAccept = () => {
    acceptRequest({ recipientId, requesterId });
  };
  const handleReject = () => {
    rejectRequest({ recipientId, requesterId });
  };
  return (
    <main className={styles.friendRequestNotification}>
      <section>
        <Image
          width={52}
          height={52}
          alt={displayName}
          src={profilePicture}
          className={styles.avatar}
        />
        <div>
          <span>
            <strong>{displayName}</strong>
            <p>Wants to connect!</p>
          </span>
        </div>
      </section>
      <section className="flex">
        <ButtonIcon
          title="Accept"
          icon={<IoCheckmark className={styles.acceptIcon} />}
          value="accepted"
          onClick={handleAccept}
        />
        <ButtonIcon
          title="Reject"
          icon={<IoClose className={styles.declineIcon} />}
          value="rejected"
          onClick={handleReject}
        />
      </section>
      <div className={styles.time}>
        {dayjs(createAt).format("MMM D, YYYY h:mm A")}
      </div>
    </main>
  );
};
export default FriendRequestNotification;
