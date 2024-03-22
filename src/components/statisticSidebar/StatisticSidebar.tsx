import React from "react";
import { useSelector } from "react-redux";
import { StateUsers } from "../../store/slices/userList.slice";
import styles from "./statisticsSidebar.module.scss";

const StatisticSidebar: React.FC = () => {
  const { statData } = useSelector(
    (state: { usersList: StateUsers }) => state.usersList,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{statData?.totalUsersCount || 0} Users</div>
      <div className={styles.ageGroups}>
        <span className={styles.ageGroups_title}>Age Groups</span>
        <div>
          <span className={styles.stat_field}>11 to 20</span>
          <span className={styles.stat_field_data}>
            {statData?.ageGroups["11-20"] || 0}
          </span>
        </div>
        <div>
          <span className={styles.stat_field}>21 to 30</span>
          <span className={styles.stat_field_data}>
            {statData?.ageGroups["21-30"] || 0}
          </span>
        </div>
        <div>
          <span className={styles.stat_field}>31 to 40</span>
          <span className={styles.stat_field_data}>
            {statData?.ageGroups["31-40"] || 0}
          </span>
        </div>
        <div>
          <span className={styles.stat_field}>41 to 50</span>
          <span className={styles.stat_field_data}>
            {statData?.ageGroups["41-50"] || 0}
          </span>
        </div>
        <div>
          <span className={styles.stat_field}>51+</span>
          <span className={styles.stat_field_data}>
            {statData?.ageGroups["50+"] || 0}
          </span>
        </div>
      </div>
      <div className={styles.genders}>
        <span className={styles.genders_title}>Gender Groups</span>
        <div>
          <span className={styles.stat_field}>Male</span>
          <span className={styles.stat_field_data}>{statData?.totalMale || 0}</span>
        </div>
        <div>
          <span className={styles.stat_field}>Female</span>
          <span className={styles.stat_field_data}>
            {statData?.totalFemale || 0} 
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticSidebar;
