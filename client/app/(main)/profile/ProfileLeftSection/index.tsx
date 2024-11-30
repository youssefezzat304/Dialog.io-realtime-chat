"use client";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  MdDelete,
  MdModeEditOutline,
  MdOutlineDataSaverOn,
} from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { UploadFileBtn } from "@/_components";
import { ProfileLeftSectionProps } from "@/types/props.types";
import Image from "next/image";
import useUserStore from "@/services/stores/user.store";

import styles from "./index.module.css";

const ProfileLeftSection = ({
  control,
  saveChanges,
  resetSettings,
  errors,
}: ProfileLeftSectionProps) => {
  const [editName, setEditName] = useState(false);
  const { setProfilePic, profilePic, setPpFile } = useUserStore();
  const currentUser = useUserStore((state) => state.user);

  const handleEditName = useCallback(() => {
    setEditName((prev) => !prev);
  }, []);

  const handleUploadProfilePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setPpFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePic(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [setPpFile, setProfilePic],
  );

  const removeProfilePhoto = useCallback(() => {
    setProfilePic("");
  }, [setProfilePic]);

  const profilePicture = useMemo(() => {
    return (
      <>
        <Image
          width={230}
          height={230}
          src={profilePic ? profilePic : currentUser?.profilePicture!}
          className={styles.placeholder}
          alt="Profile picture"
        />
      </>
    );
  }, [profilePic]);
  return (
    <form
      className={styles.profileLeftSec}
      onSubmit={control.handleSubmit((data) => saveChanges(data))}
    >
      {profilePicture}
      <section>
        <input
          type="text"
          defaultValue={currentUser?.displayName}
          {...control.register("displayName")}
        />
        <MdModeEditOutline
          className={styles.editNameIcon}
          title="Edit display name"
          onClick={handleEditName}
        />
      </section>
      <UploadFileBtn
        icon={<LuUpload className={styles.uploadProfilePicIcon} />}
        text="Upload photo"
        classNameStlyes={styles.uploadProfilePicBtn}
        onChangeEvent={handleUploadProfilePicture}
      />
      <button
        type="button"
        title="Remove profile picture"
        className={styles.removePpBtn}
        onClick={removeProfilePhoto}
      >
        <MdDelete className={styles.removePpIcon} />
        Remove photo
      </button>
      <button
        type="button"
        title="Reset settings"
        className={styles.resetBtn}
        onClick={resetSettings}
      >
        <FaUndo className={styles.removePpIcon} />
        Reset
      </button>
      {errors.displayName && (
        <span className={styles.profilePicError}>
          {errors.displayName.message}
        </span>
      )}

      <button
        type="submit"
        disabled={control._formState.isLoading}
        title="Save changes"
        className={styles.saveBtn}
      >
        {control._formState.isLoading ? (
          "loading..."
        ) : (
          <>
            <MdOutlineDataSaverOn className={styles.removePpIcon} />
            Save changes
          </>
        )}
      </button>
    </form>
  );
};

export default ProfileLeftSection;
