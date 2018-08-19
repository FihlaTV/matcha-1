// @flow
/* eslint-disable no-magic-numbers */
import { api, privateKey } from 'src/services/config';
import axios from 'axios';
import type { UserType } from 'src/types/User';
import { size } from 'lodash';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

const isEmailValid = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const userVerification = (user: UserType) => {
  const {
    username,
    email,
    password,
  } = user;
  if (size(username) < 3) { throw new Error('USERNAME_TOO_SHORT'); }
  if (!isEmailValid(email)) { throw new Error('EMAIL_INVALID'); }
  if (size(password) < 6) { throw new Error('WEAK_PASSWORD'); }
};

// post users/
export async function post(user: UserType) {
  try {
    userVerification(user);
    const password = Base64.stringify(hmacSHA512(user.password, privateKey));
    const response = await axios.post(api.concat('users/'), { ...user, password });
    if (response.data.insertId === undefined) {
      throw new Error(response.data.code);
    }
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

// post login/
export async function login(username: string, password: string) {
  try {
    if (size(username) < 3) { throw new Error('USERNAME_TOO_SHORT'); }
    if (size(password) < 6) { throw new Error('WEAK_PASSWORD'); }
    const passwordEncrypted = Base64.stringify(hmacSHA512(password, privateKey));
    const response = await axios.post(api.concat('users/login/'), { password: passwordEncrypted, username });
    if (response.data.user === undefined) {
      throw new Error(response.data.code);
    }
    return response.data.user;
  } catch (err) {
    throw new Error(err);
  }
}

// post confirmation/
export async function confirmation(email: string, token: string) {
  try {
    if (!isEmailValid(email)) { throw new Error('EMAIL_INVALID'); }
    if (size(token) < 88) { throw new Error('INVALID_CODE'); }
    const response = await axios.post(api.concat('users/confirmation/'), { email, token });
    if (response.data.user === undefined) {
      throw new Error(response.data.code);
    }
    return response.data.user;
  } catch (err) {
    throw new Error(err);
  }
}

// post reset/
export async function resetPassword(email: string) {
  try {
    if (!isEmailValid(email)) { throw new Error('EMAIL_INVALID'); }
    const response = await axios.post(api.concat('users/reset/'), { email });
    if (response.data.code !== 'EMAIL_SENT') {
      throw new Error(response.data.code);
    }
    return response.data.user;
  } catch (err) {
    throw new Error(err);
  }
}

// post changePassword/
export async function changePassword(token: string, password: string, password2: string) {
  try {
    if (size(password) < 6) { throw new Error('WEAK_PASSWORD'); }
    if (size(password2) < 6) { throw new Error('WEAK_PASSWORD'); }
    if (password !== password2) { throw new Error('PASSWORD_NOT_MATCH'); }
    const passwordEncrypted = Base64.stringify(hmacSHA512(password, privateKey));
    const response = await axios.post(api.concat('users/changePassword'), { password: passwordEncrypted, token });
    if (response.data.code !== 'PASSWORD_CHANGED') {
      throw new Error(response.data.code);
    }
    return response;
  } catch (err) {
    throw new Error(err);
  }
}
