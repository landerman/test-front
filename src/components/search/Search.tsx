import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getUsersList } from "../../store/thunks/userList";
import { AppDispatch } from "../../types/appHooks";
import { getSearchedUsersList } from "../../store/slices/userList.slice";
import styles from "./search.module.scss";

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    dispatch(getUsersList());
  }, []);

  const debouncedDispatchSearch = (searchQuery: string, delay: number) => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(
        () => dispatch(getSearchedUsersList(searchQuery)),
        delay,
      );
    };
  };

  const onCnangeHandler = (data: string) => {
    debouncedDispatchSearch(data, 500)();
    setInputValue(data);
  };
  const onRefreshClickHandler = () => {
    dispatch(getUsersList());
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        onChange={(e) => onCnangeHandler(e.currentTarget.value)}
        value={inputValue}
        className={styles.input}
        placeholder="Search"
      />
      <button className={styles.refresh_button} onClick={onRefreshClickHandler}>
        Refresh Users
      </button>
    </div>
  );
};

export default Search;
