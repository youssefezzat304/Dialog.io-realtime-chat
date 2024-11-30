"use client";
import AddFriendDialog from "../../common/Dialog/AddFriendDialog";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { RiContactsBook3Fill, RiLogoutCircleLine } from "react-icons/ri";
import { PiChatsFill } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import NavBarBtn from "@/_components/common/Button/NavBarBtn";
import useLogOut from "@/hooks/useLogOut";
import useNavBar from "@/hooks/useNavBar";
import Image from "next/image";
import Link from "next/link";
import useUserStore from "@/services/stores/user.store";

import styles from "./index.module.css";

const NavBar = () => {
  const { gotoChats, gotoContacts, handleFriendRequests, handleNotifications } =
    useNavBar();
  const currentUser = useUserStore((state) => state.user);
  const { handleLogOut } = useLogOut();

  return (
    <div className={styles.navBar}>
      <Link href={"/profile"}>
        <Image
          height={60}
          width={60}
          src={currentUser?.profilePicture!}
          alt="Profile Picture"
          className={styles.placeholder}
        />
      </Link>

      <section className={styles.icons}>
        <NavBarBtn
          icon={<IoNotifications className={styles.sideIcon} />}
          title="Alerts"
          onClick={handleNotifications}
        />
        <NavBarBtn
          icon={<PiChatsFill className={styles.sideIcon} />}
          title="Chats"
          onClick={gotoChats}
        />
        <NavBarBtn
          icon={<RiContactsBook3Fill className={styles.sideIcon} />}
          title="Contacts"
          onClick={gotoContacts}
        />
        <NavBarBtn
          icon={<FaUserFriends className={styles.sideIcon} />}
          title="Friend requests"
          onClick={handleFriendRequests}
        />
        <AddFriendDialog />
      </section>
      <section className={styles.bottom}>
        <NavBarBtn
          icon={<IoSettingsSharp className={styles.sideIcon} />}
          title="Settings"
        />
        <button
          className={`${styles.logoutBtn} ${styles.sideBtn}`}
          type="button"
          title="Log-out"
          onClick={handleLogOut}
        >
          <RiLogoutCircleLine className={styles.logoutIcon} />
          Log out
        </button>
      </section>
    </div>
  );
};

export default NavBar;
