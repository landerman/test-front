import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../types/user";
import { StateUsers } from "../../store/slices/userList.slice";
import { setActiveCard, deleteUser } from "../../store/slices/userList.slice";
import styles from "./userCard.module.scss";
import delete_icon from "../../assets/delete.svg";

const UserCard: React.FC<{ data: User }> = ({ data }: { data: User }) => {
  const { name, email, phone, adress, birthday, picture, id } = data;
  const { activeCard } = useSelector(
    (state: { usersList: StateUsers }) => state.usersList,
  );
  const isCurrentActive = activeCard === id;
  const dispatch = useDispatch();

  const onCardClickHandler = () => {
    dispatch(setActiveCard(id));
  };
  const deleteHandler = () => {
    isCurrentActive && dispatch(deleteUser(id));
  };

  return (
    <div
      className={`${styles.user} ${isCurrentActive ? styles.user_active : ""}`}
      onClick={onCardClickHandler}
    >
      <div className={styles.user_header}>
        <img className={styles.user_photo} src={picture} />
        <div className={styles.user_title}>
          <span className={styles.user_name}>{name}</span>
          <a className={styles.user_field_data} href={"mailto:" + email}>
            {email}
          </a>
        </div>
      </div>
      <div className={styles.user_details_wrapper}>
        <div className={styles.user_details}>
          <span className={styles.user_field}>Phone No</span>
          <a href={"tel:" + phone} className={styles.user_field_data}>
            {phone}
          </a>
        </div>
        <div className={styles.user_details}>
          <span className={styles.user_field}>Birthday</span>
          <span className={styles.user_field_data}>{birthday}</span>
        </div>

        <div className={styles.user_details}>
          <span className={styles.user_field}>Address</span>
          <span className={styles.user_field_data}>{adress}</span>
        </div>
      </div>
      {isCurrentActive && (
        <button className={styles.delete} onClick={deleteHandler}>
          <img src={delete_icon} />
        </button>
      )}
    </div>
  );
};

export default UserCard;
