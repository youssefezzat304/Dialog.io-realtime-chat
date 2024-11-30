import { CiSearch } from "react-icons/ci";
import BurgerMenuBtn from "../../Button/BurgerMenuBtn";
import useMediaQuery from "@/hooks/useMediaQuery";
import useTabletStore from "@/services/stores/tablet.store";
import CreateGroup from "@/_components/common/Dialog/CreateGroup";
import useTabsStore from "@/services/stores/tabs.store";

import styles from "./index.module.css";

const FriendsSearch = () => {
  const { isTablet } = useMediaQuery();
  const setTabletNavBar = useTabletStore((state) => state.setTabletNavBar);
  const setFriendsTab = useTabsStore((state) => state.setFriendsTab);

  const openNavBar = () => {
    setFriendsTab(false);
    setTabletNavBar(true);
  };
  return (
    <main className={styles.friendsSearchMain}>
      {isTablet && (
        <BurgerMenuBtn className={styles.burgerMenu} onClick={openNavBar} />
      )}
      <div className={styles.searchBarContainer}>
        <input
          title="Search"
          className={styles.friendsSearchBar}
          placeholder="Search"
        />
        <CiSearch className={styles.friendsSearchIcon} />
      </div>
      <CreateGroup />
    </main>
  );
};

export default FriendsSearch;
