import { StatData } from "../types/statData";
import { UsersList, User, FetchedUser, FetchedUsersList } from "../types/user";

export const getAge = (date: string): number => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dob = new Date(date);
  const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

  let age = today.getFullYear() - dob.getFullYear();
  if (today < dobnow) {
    age--;
  }
  return age;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const getFullName = (currentUser: FetchedUser): string =>
  `${currentUser.name.first} ${currentUser.name.last}`;

export const getUsersListState = (users: FetchedUsersList): UsersList => {
  return users.map((currentUser: FetchedUser) => ({
    gender: currentUser.gender,
    name: getFullName(currentUser),
    email: currentUser.email,
    phone: currentUser.phone,
    birthday: formatDate(currentUser.dob.date),
    age: getAge(currentUser.dob.date),
    adress: `${currentUser.location.city}, ${currentUser.location.state}, ${currentUser.location.country}`,
    picture: currentUser.picture.medium,
    id: currentUser.login.uuid,
  }));
};

export const searchUsers = (users: UsersList, query: string): UsersList => {
  const normalizedQuery = query.toLowerCase();
  const sanitizedQuery = normalizedQuery.replace(/[^a-zA-Z0-9]/g, "");

  return users.filter((currentUser: User) => {
    const { name, adress, birthday } = currentUser;
    return (
      name.includes(normalizedQuery) ||
      currentUser.email.toLowerCase().includes(normalizedQuery) ||
      currentUser.phone.replace(/[^a-zA-Z0-9]/g, "").includes(sanitizedQuery) ||
      birthday.includes(normalizedQuery) ||
      adress.toLowerCase().includes(normalizedQuery)
    );
  });
};

export const getStatData = (users: UsersList): StatData => {
  const ageGroups = {
    "11-20": 0,
    "21-30": 0,
    "31-40": 0,
    "41-50": 0,
    "50+": 0,
  };
  let totalUsersCount = 0;
  let maleCount = 0;
  let femaleCount = 0;

  users.forEach((user) => {
    const age = user.age;
    if (age >= 11 && age <= 20) {
      ageGroups["11-20"]++;
    } else if (age >= 21 && age <= 30) {
      ageGroups["21-30"]++;
    } else if (age >= 31 && age <= 40) {
      ageGroups["31-40"]++;
    } else if (age >= 41 && age <= 50) {
      ageGroups["41-50"]++;
    } else if (age >= 51) {
      ageGroups["50+"]++;
    }
    totalUsersCount++;
    if (user.gender === "male") {
      maleCount++;
    } else {
      femaleCount++;
    }
  });

  return {
    ageGroups,
    totalMale: maleCount,
    totalFemale: femaleCount,
    totalUsersCount: totalUsersCount,
  };
};

export const deleteUserById = (users: UsersList, id: string): UsersList => {
  return users.filter((item) => item.id !== id);
};
