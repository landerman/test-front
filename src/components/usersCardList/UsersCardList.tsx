import React from "react";
import { useSelector } from "react-redux";
import { StateUsers } from "../../store/slices/userList.slice";
import UserCard from "../userCard/userCard";
import { User } from "../../types/user";
import styles from "./usersCardList.module.scss";

const UsersCardList: React.FC = () => {
  const { filteredUsersList } = useSelector(
    (state: { usersList: StateUsers }) => state.usersList,
  );

  return (
    <div className={styles.usersList}>
      {filteredUsersList.map((userData: User) => {
        return <UserCard data={userData} key={userData.id} />;
      })}
    </div>
  );
};

export default UsersCardList;
