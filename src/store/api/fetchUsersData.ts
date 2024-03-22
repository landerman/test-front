import axios from "axios";

export const fetchUsersData = async () => {
  try {
    const response = await axios.get(`https://randomuser.me/api/?results=500`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
