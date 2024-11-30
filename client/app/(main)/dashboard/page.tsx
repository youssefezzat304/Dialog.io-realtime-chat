"use client";
import {
  Notifications,
  FriendRequests,
  MainConsole,
  Members,
} from "../../../_components";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ChatInfoContainer from "@/_components/container/ChatInfoContainer";
import { useMemo } from "react";
import useTabsStore from "@/services/stores/tabs.store";

import styles from "./index.module.css";

export default function Dashboard() {
  const { friendRequestsTab, membersTab, chatInfoTab, notificationsTab } =
    useTabsStore((state) => ({
      friendRequestsTab: state.friendRequestsTab,
      membersTab: state.membersTab,
      chatInfoTab: state.chatInfoTab,
      notificationsTab: state.notificationsTab,
    }));

  const tabsOpen = useMemo(
    () =>
      notificationsTab.isOpen ||
      friendRequestsTab.isOpen ||
      chatInfoTab ||
      membersTab,
    [notificationsTab, friendRequestsTab, chatInfoTab, membersTab],
  );

  const Alerts = useMemo(
    () => (
      <Panel defaultSize={30} minSize={22} maxSize={30}>
        {notificationsTab.isOpen ? (
          <Notifications />
        ) : (
          friendRequestsTab.isOpen && <FriendRequests />
        )}
      </Panel>
    ),
    [notificationsTab.isOpen, friendRequestsTab.isOpen],
  );

  const Info = useMemo(
    () => (
      <Panel defaultSize={25} maxSize={40} minSize={15}>
        <PanelGroup direction="vertical" className={styles.rightSec}>
          {chatInfoTab && <ChatInfoContainer />}
          <PanelResizeHandle />
          {membersTab && <Members />}
        </PanelGroup>
      </Panel>
    ),
    [chatInfoTab, membersTab],
  );

  return (
    <>
      <PanelGroup
        direction="horizontal"
        autoSaveId="main"
        className={styles.main}
      >
        <Panel className={styles.hero} defaultSize={tabsOpen ? 75 : 100}>
          <MainConsole />
        </Panel>
        {tabsOpen && (
          <>
            <PanelResizeHandle />
            {notificationsTab.isOpen || friendRequestsTab.isOpen
              ? Alerts
              : Info}
          </>
        )}
      </PanelGroup>
    </>
  );
}
