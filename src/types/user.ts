export type FetchedUser = {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  dob: {
    date: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  age: number;
  picture: {
    medium: string;
  };
  login: {
    uuid: string;
  };
};
export type User = {
  gender: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  adress: string;
  age: number;
  picture: string;
  id: string;
};

export type UsersList = User[];
export type FetchedUsersList = FetchedUser[];
