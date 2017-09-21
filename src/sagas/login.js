import { take, put, call, fork } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  RESET_PASSWORD,
  SIGNUP_REQUEST
} from '../actions/types';
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure
} from '../actions/AuthActions';
import {
  loginUser,
  resetPass,
  signupUser
} from '../api';

function* watchLoginRequest() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUEST);

    try {
      const payload = {
          email,
          password,
        };

      const response = yield call(loginUser, payload);

      if (response.status >= 200 && response.status < 300) {
        const data = yield response.json();
        if (data.login) {
          yield put(loginSuccess(data));
        } else {
          yield put(loginFailure(data.message || 'Invalid email or password'));
        }
      } else {
        yield put(loginFailure('Invalid email or password'));
      }
    } catch (error) {
      yield put(loginFailure('Login failed. Please try again.'));
    }
  }
}

function* watchResetRequest() {
  while (true) {
    const { email } = yield take(RESET_PASSWORD);
    try {
      const payload = {
          email
        };

      const response = yield call(resetPass, payload);

      if (response.status >= 200 && response.status < 300) {
        yield put(loginFailure('We\'ve sent you an email to reset your password.'));
      } else {
        yield put(loginFailure('Reset password failed. Please try again.'));
      }
    } catch (error) {
      yield put(loginFailure('Reset password failed. Please try again.'));
    }
  }
}

function* watchSignupRequest() {
  while (true) {
    const { name, email, password } = yield take(SIGNUP_REQUEST);

    console.log(name);

    try {
      const payload = {
          name,
          email,
          password,
        };

      const response = yield call(signupUser, payload);

      if (response.status >= 200 && response.status < 300) {
        const data = yield response.json();
        if (data.login) {
          yield put(signupSuccess(data));
        } else {
          yield put(signupFailure(data.message || 'Invalid email or password'));
        }
      } else {
        yield put(signupFailure('Invalid email or password'));
      }
    } catch (error) {
      yield put(signupFailure('Login failed. Please try again.'));
    }
  }
}

export default function* root() {
  yield fork(watchLoginRequest);
  yield fork(watchResetRequest);
  yield fork(watchSignupRequest);
}
