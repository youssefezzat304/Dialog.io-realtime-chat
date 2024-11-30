import { User } from "@/types/user.types";
import Image from "next/image";

import styles from "./index.module.css";

const AddFriendToGroup = ({ friend }: { friend: User }) => {
  const { profilePicture, displayName } = friend;
  return (
    <div className={styles.container}>
      <section className={styles.subjectMain}>
        <Image
          width={40}
          height={40}
          className={styles.profilePic}
          alt="Profile Picture"
          src={profilePicture}
        />
        <div className={styles.friendName}>
          <label htmlFor="">{displayName}</label>
        </div>
      </section>

      <section className={styles.buttons}>
        <button className={styles.admin} type="button">
          Admin
        </button>
        <button className={styles.add} type="button">
          Add
        </button>
      </section>
    </div>
  );
};

export default AddFriendToGroup;
