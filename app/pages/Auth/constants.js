import type { UserType } from 'app/types/User';

export const currentUser: UserType = {
  activeAt: '2018-07-15T14:25:50.000Z',
  createdAt: '2018-07-15T14:25:50.000Z',
  dob: '1989-05-30T00:00:00.000Z',
  email: 'sawyer@gmail.com',
  id: 1,
  lat: 46.528999,
  long: 6.5,
  name: 'Virgil Sawyer',
  password: '3bb37061e887baa3b48ebe9f060f1a42baf995fb',
  picture: '/img/profiles/no-pic.jpg',
  tokenLost: null,
  tokenValidated: null,
  updatedAt: '2018-07-15T14:25:50.000Z',
  username: 'admin',
};

export const emptyUser: UserType = {
  activeAt: '',
  createdAt: '',
  dob: '',
  email: '',
  id: 0,
  lat: 0,
  long: 0,
  name: '',
  password: '',
  picture: '',
  tokenLost: null,
  tokenValidated: null,
  updatedAt: '',
  username: '',
};
