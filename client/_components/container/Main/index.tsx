"use client";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Chat from "../Chat";
import Chats from "../../List/Chats";
import Friends from "../../List/Friends";
import useTabletStore from "@/services/stores/tablet.store";
import NavBarTablet from "@/_components/common/Menu/NavBarTablet";
import useMediaQuery from "@/hooks/useMediaQuery";
import useTabsStore from "@/services/stores/tabs.store";

import styles from "./index.module.css";

const MainConsole = () => {
  const friendsTab = useTabsStore((state) => state.friendsTab);
  const tabletNavBar = useTabletStore((state) => state.tabletNavBar);
  const { isTablet } = useMediaQuery();

  return (
    <PanelGroup
      className={styles.mainConsole}
      direction="horizontal"
      autoSaveId="dashboard"
    >
      <Panel
        className={styles.friendList}
        title="Friends list"
        defaultSize={30}
        minSize={isTablet ? 35 : 25}
        maxSize={isTablet ? 35 : 100}
      >
        {friendsTab ? (
          <Friends />
        ) : tabletNavBar && isTablet ? (
          <NavBarTablet />
        ) : (
          <Chats />
        )}
      </Panel>
      <PanelResizeHandle />
      <Panel className={styles.chatSec} defaultSize={65} minSize={40}>
        <Chat />
      </Panel>
    </PanelGroup>
  );
};

export default MainConsole;
