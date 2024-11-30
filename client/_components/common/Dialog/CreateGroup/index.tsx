"use client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FormEvent, Fragment, useState } from "react";
import ButtonIcon from "@/_components/common/Icon/ButtonIcon";
import { FaCirclePlus } from "react-icons/fa6";
import Image from "next/image";
import { TextareaAutosize } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { User } from "@/types/user.types";
import AddFriendToGroup from "@/_components/common/Entities/AddFriendToGroup";
import useUserStore from "@/services/stores/user.store";
import createGroupPlaceholder from "@/public/assets/create-group-placeholder.svg";

import styles from "./index.module.css";

export default function CreateGroup() {
  const [open, setOpen] = useState(false);
  const currentUser = useUserStore((state) => state.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <ButtonIcon
        icon={<FaCirclePlus className={styles.createGroupIcon} />}
        title="Create group"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          className: styles.container,
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle className={styles.title}>Create a new group</DialogTitle>
        <section className={styles.info}>
          <Image
            height={180}
            width={180}
            alt="Group picture"
            src={createGroupPlaceholder}
            className={styles.groupPic}
          />
          <div>
            <input type="text" placeholder="Group name" />
            <TextareaAutosize
              minRows={7}
              placeholder="Description"
              className={styles.description}
            />
          </div>
        </section>

        <section className={styles.friendsContainer}>
          <div className={styles.friends}>
            <div className={styles.searchBarContainer}>
              <input
                title="Search"
                className={styles.friendsSearchBar}
                placeholder="Search"
              />
              <CiSearch className={styles.friendsSearchIcon} />
            </div>
            <div className={styles.friendList}>
              {currentUser?.friends?.map((friend: User) => {
                return <AddFriendToGroup key={friend._id} friend={friend} />;
              })}
            </div>
          </div>
          <div className={styles.members}></div>
        </section>

        <div className={styles.buttons}>
          <button className={styles.cancel} type="button" onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.create} type="submit">
            Create group
          </button>
        </div>
      </Dialog>
    </Fragment>
  );
}
