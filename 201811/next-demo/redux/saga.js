
import { all, call, put, take, takeLatest } from 'redux-saga/effects';

import {actionTypes, failure, loadDataSuccess} from './actions'
function *loadDataSage () {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    yield put(loadDataSuccess(data))
  }
  catch(e) {
    yield put(failure(e))
  }
}
function *rootSaga () {
  yield all([takeLatest(actionTypes.LOAD_DATA, loadDataSage)])
}

export default rootSaga