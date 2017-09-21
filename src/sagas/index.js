import { fork } from 'redux-saga/effects';

import init from './init';
import login from './login';
import main from './main';

// TODO Consider using takeEvery
export default function* root() {
  yield fork(init);
  yield fork(login);
  yield fork(main);
}
