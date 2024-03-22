import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersData } from "../api/fetchUsersData";

export const getUsersList = createAsyncThunk(
  "usersList/fetchUsersList",
  async () => {
    return await fetchUsersData();
  },
);
