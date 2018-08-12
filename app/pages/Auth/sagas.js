import { put, takeLatest, call } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN,
  LOGOUT,
  setUser,
  SIGNUP,
  unsetUser,
} from 'app/pages/Auth/actions';
import * as userServices from 'app/services/users';
import { toast } from 'app/components/Layout/actions';

// worker Saga: will be fired on LOGIN action
function* logInWorker(action) {
  yield put(setUser(action.user));
  yield Actions.home();
}

function* logInSaga() {
  yield takeLatest(LOGIN, logInWorker);
}

// worker Saga: will be fired on LOGOUT action
function* logOutWorker() {
  yield put(unsetUser());
  yield Actions.reset('login');
}

function* logOutSaga() {
  yield takeLatest(LOGOUT, logOutWorker);
}

// worker Saga: will be fired on SIGNUP action
function* signUpWorker(action) {
  const { user } = action;
  try {
    yield call(userServices.post, user);
    yield Actions.reset('feed');
  } catch (err) {
    yield put(toast(err.message));
  }
}

function* signUpSaga() {
  yield takeLatest(SIGNUP, signUpWorker);
}

export default [logInSaga, logOutSaga, signUpSaga];
