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

export const getDay = (date: Date): string => {
  return `${date.getDate()}`;
};

export const getMonth = (date: Date): string => {
  return date.toLocaleDateString("en-US", { month: "long" });
};

export const getYear = (date: Date): string => {
  return `${date.getFullYear()}`;
};

export const getFullName = (currentUser: FetchedUser): string =>
  `${currentUser.name.first} ${currentUser.name.last}`;

export const getUsersListState = (users: FetchedUsersList): UsersList => {
  return users.map((currentUser: FetchedUser) => {
    const dobDate = new Date(currentUser.dob.date);
    const day = getDay(dobDate);
    const month = getMonth(dobDate);
    const year = getYear(dobDate);
    return {
    gender: currentUser.gender,
    name: getFullName(currentUser),
    email: currentUser.email,
    phone: currentUser.phone,
    birthday: `${month} ${day}, ${year}`,
    dob:{
      day: day,
      month: month,
      year: year,
    },
    age: getAge(currentUser.dob.date),
    adress: `${currentUser.location.city}, ${currentUser.location.state}, ${currentUser.location.country}`,
    picture: currentUser.picture.medium,
    id: currentUser.login.uuid,
    }

  });
};

// поиск по дате в любой последовательности параметров [день | месяц | год], 
// включая поиск по одному, двум или трем параметрам из трех:
const searchByDate = (searchTerms: string[], searchStringCount: number, day: string, month: string, year: string) =>{
  let result = false;
  let searchDay = ''
  let searchMonth = ''  
  let searchYear = ''

  searchTerms.forEach((term: string )=> {
      if (!isNaN(Number(term))){
        if(searchDay){
          searchYear = term
        }else{
          searchDay = term
        }
      }else{
        searchMonth = term
      }
    });

    const isDayInclude = !!searchDay && (day.includes(searchDay)|| year.includes(searchDay)) ;
    const isMonthInclude = !!searchMonth && month.toLowerCase().includes(searchMonth);
    const isYearInclude = !!searchYear && (year.includes(searchYear) || day.includes(searchYear));

    switch (searchStringCount) {
      case 3: 
      result = isDayInclude && isMonthInclude && isYearInclude;
      break
      case 2: 
      result = (isDayInclude && isMonthInclude) || (isMonthInclude && isYearInclude) || (isDayInclude && isYearInclude)
      break
      case 1: 
      console.log(searchMonth, month)
      result = isDayInclude || isMonthInclude || isYearInclude;
    }

  return result
}


export const searchUsers = (users: UsersList, query: string): UsersList => {
  // строка запроса, без лишних пробелов
  const normalizedQuery = query.replace(/\s+/g, ' ').trim().toLowerCase();
  // строка запроса, включающая только цифры, буквы (на любом языке) и пробелы между ними
  const sanitizedQuery = normalizedQuery.replace(/[^\p{L}\p{N}\s]/gu, '');
  //строка запроса, включающая только цифры и буквы:
  const sanitizedQueryPhone = normalizedQuery.replace(/[^\p{L}\p{N}]/gu, '');

  const searchTerms = sanitizedQuery.split(' ');
  const searchTermsCount = searchTerms.length;

  if(searchTermsCount === 0){
    return users
  }

  return users.filter((currentUser: User) => {
    const { name, adress, dob: {day, month, year} } = currentUser;

    return (
      name.toLowerCase().includes(sanitizedQuery) ||
      currentUser.email.toLowerCase().includes(normalizedQuery) ||
      currentUser.phone.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase().includes(sanitizedQueryPhone) ||
      adress.toLowerCase().includes(normalizedQuery) ||
      searchByDate(searchTerms,searchTermsCount, day, month, year)
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
