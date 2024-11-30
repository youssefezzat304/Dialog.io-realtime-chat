"use client";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Fragment, useCallback, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import AddFriend from "../../../container/AddFriend";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FriendRequestState } from "@/types/friendSystem.types";
import {
  FriendRequestSchema,
  friendRequestValidation,
} from "@/services/validation/friendSystem.validation";
import { sendFriendRequest } from "@/api/friendrequest.api";
import useUserStore from "@/services/stores/user.store";

import styles from "./index.module.css";

export default function AddFriendDialog() {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const [isFriendReqSuccessful, setIsFriendReqSuccessful] =
    useState<FriendRequestState>(null);

  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<FriendRequestSchema>({
    resolver: zodResolver(friendRequestValidation),
  });

  const handleFriendRequest: SubmitHandler<FriendRequestSchema> = useCallback(
    async (data) => {
      if (!user) {
        console.error("No current user data.");
        return;
      }

      if (data.recipientEmail === user.email) {
        setIsFriendReqSuccessful(null);
        setError("root", {
          message: "You can't send a friend request to yourself.",
        });
        return;
      }

      const requestData = {
        requesterEmail: user.email,
        recipientEmail: data.recipientEmail,
      };

      try {
        const response: any = await sendFriendRequest(requestData);
        const { status, data: responseData } = response.response || response;

        clearErrors();
        if (status === 404 || status === 400) {
          setIsFriendReqSuccessful(status === 400 ? "warning" : null);
          setError("root", { message: responseData.message });
        }
        if (status === 200) {
          setIsFriendReqSuccessful("success");
        }
      } catch (error) {
        console.error("Error sending friend request:", error);
      }
    },
    [user, setError, clearErrors],
  );

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    clearErrors();
    setIsFriendReqSuccessful(null);
    setOpen(false);
  }, [clearErrors]);
  return (
    <Fragment>
      <button
        className={styles.sideBtn}
        type="button"
        title="Add Friend"
        onClick={handleClickOpen}
      >
        <FaUserPlus className={styles.sideIcon} />
        Add Friend
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(handleFriendRequest),
        }}
      >
        <DialogContent>
          <AddFriend
            control={control}
            errors={errors}
            handleClose={handleClose}
            setIsFriendReqSuccessful={setIsFriendReqSuccessful}
            isFriendReqSuccessful={isFriendReqSuccessful}
            clearErrors={clearErrors}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
