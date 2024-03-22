import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUsersList } from "../thunks/userList";
import { UsersList } from "../../types/user";
import { StatData } from "../../types/statData";
import {
  searchUsers,
  getStatData,
  getUsersListState,
  deleteUserById,
} from "../../helpers/selectors";

export interface StateUsers {
  totalUsersList: UsersList;
  filteredUsersList: UsersList;
  statData?: StatData;
  activeCard: string | null;
}

const initialState: StateUsers = {
  totalUsersList: [],
  filteredUsersList: [],
  activeCard: null,
};

export const getUserListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    getSearchedUsersList: (state, { payload }: PayloadAction<string>) => {
      state.filteredUsersList = searchUsers(state.totalUsersList, payload);
    },
    setActiveCard: (state, { payload }: PayloadAction<string>) => {
      state.activeCard = payload;
    },
    deleteUser: (state, { payload }: PayloadAction<string>) => {
      state.totalUsersList = deleteUserById(state.totalUsersList, payload);
      const filteredList = deleteUserById(state.filteredUsersList, payload);
      state.filteredUsersList = filteredList;
      state.statData = getStatData(filteredList);
    },
  },
  extraReducers(builder) {
    builder.addCase(getUsersList.fulfilled, (state, { payload }) => {
      const filteredList = getUsersListState(payload);
      state.totalUsersList = filteredList;
      state.filteredUsersList = filteredList;
      state.statData = getStatData(filteredList);
    });
  },
});

export const {
  actions: { getSearchedUsersList, setActiveCard, deleteUser },
} = getUserListSlice;
