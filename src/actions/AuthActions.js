import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_REQUEST,
  LOGOUT,
  RESET_PASSWORD,
  SIGNUP_INPUT_CHANGED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED
} from './types';
import { get } from '../ApiUtils';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
  };
};

export const signupInputChanged = (key, val) => {
  return {
    type: SIGNUP_INPUT_CHANGED,
    payload: {
      key,
      val
    }
  };
};

export const signupUser = ({ name, email, password }) => {
  return {
    type: SIGNUP_REQUEST,
    email,
    password,
    name
  };
};

export const resetPassword = ({ email }) => {
  return {
    type: RESET_PASSWORD,
    email
  };
};

export function signupSuccess({ token, user }) {
  return {
    type: SIGNUP_SUCCESS,
    token,
    user,
  };
}

export function signupFailure(err) {
  return {
    type: SIGNUP_FAILED,
    err,
  };
}

export function loginSuccess({ token, user }) {
  return {
    type: LOGIN_USER_SUCCESS,
    token,
    user,
  };
}

export function loginFailure(err) {
  return {
    type: LOGIN_USER_FAILED,
    err,
  };
}

export function logout() {
  get('/logout');
  return {
    type: LOGOUT
  };
}
