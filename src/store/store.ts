import { configureStore } from "@reduxjs/toolkit";
import { getUserListSlice } from "./slices/userList.slice";

const store = configureStore({
  reducer: {
    usersList: getUserListSlice.reducer,
  },
});

export default store;
