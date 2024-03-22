import React from "react";
import Search from "../search/Search";
import UsersCardList from "../usersCardList/UsersCardList";
import StatisticSidebar from "../statisticSidebar/StatisticSidebar";
import styles from "./mainPage.module.scss";

const MainPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Search />
      <div className={styles.mainInfo}>
        <UsersCardList />
        <StatisticSidebar />
      </div>
    </div>
  );
};

export default MainPage;
