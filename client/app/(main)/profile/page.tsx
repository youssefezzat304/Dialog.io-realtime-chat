"use client";
import {
  FriendRequests,
  NavBar,
  Notifications,
  RoutesLoading,
  SaveChangesAlert,
} from "@/_components";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/services/validation/user.validation";
import { deleteProfilePic, sendProfilePic, updateInfo } from "@/api/axios";
import { Panel, PanelGroup } from "react-resizable-panels";
import useAuthenticateUser from "@/hooks/useAuthenticateUser";
import ProfileLeftSection from "./ProfileLeftSection";
import ProfileFormSection from "./ProfileFormSection";
import useMediaQuery from "@/hooks/useMediaQuery";
import useTabsStore from "@/services/stores/tabs.store";
import useUserStore from "@/services/stores/user.store";

import styles from "./index.module.css";

const ProfileSettings = () => {
  const [open, setOpen] = useState(false);
  const { isLoading } = useAuthenticateUser();
  const { isTablet } = useMediaQuery();

  const { user, ppFile, profilePic, setProfilePic } = useUserStore((state) => ({
    user: state.user,
    ppFile: state.ppFile,
    profilePic: state.profilePic,
    setProfilePic: state.setProfilePic,
  }));

  const { notificationsTab, friendRequestsTab } = useTabsStore((state) => ({
    notificationsTab: state.notificationsTab,
    friendRequestsTab: state.friendRequestsTab,
  }));

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>({
    defaultValues: user ? user : undefined,
    resolver: zodResolver(userValidation),
  });

  const saveChanges = async (data: User) => {
    setOpen(false);
    try {
      // await updateInfo(data);
      // if (profilePic === "") {
      //   console.log("PRO deleted");
      //   await deleteProfilePic(user?._id);
      //   setProfilePic("");
      // }

      await sendProfilePic(ppFile, user!._id);

      return;
    } catch (error) {
      console.log(error);
    }
    setOpen(true);
  };

  function resetSettings() {
    if (user) reset(user);
  }

  const alertsPanel = useMemo(
    () => (
      <Panel defaultSize={30} minSize={22} maxSize={30}>
        {notificationsTab.isOpen ? <Notifications /> : <FriendRequests />}
      </Panel>
    ),
    [notificationsTab.isOpen],
  );
  if (!user || isLoading) return <RoutesLoading />;

  return (
    <>
      <PanelGroup direction="horizontal" autoSaveId="main">
        <Panel defaultSize={75} minSize={75}>
          <div className={styles.mainProfileSec}>
            <ProfileLeftSection
              control={control}
              saveChanges={saveChanges}
              resetSettings={resetSettings}
              errors={errors}
            />
            <ProfileFormSection
              control={control}
              handleSubmit={handleSubmit}
              saveChanges={saveChanges}
              errors={errors}
              setValue={setValue}
            />
          </div>
        </Panel>
        {notificationsTab.isOpen || friendRequestsTab.isOpen ? (
          alertsPanel
        ) : (
          <Panel
            className={styles.profileSettingsSec}
            defaultSize={30}
            minSize={20}
            maxSize={30}
          ></Panel>
        )}
      </PanelGroup>

      <SaveChangesAlert open={open} setOpen={setOpen} />
    </>
  );
};

export default ProfileSettings;
