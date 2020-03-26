import { put, call, takeLatest } from 'redux-saga/effects';
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_START } from '../../consts'
import { apiCall } from '../api'

export function* loginUser({ payload }) {
    debugger;
    let user ={
        username: payload.username,
        password: payload.password
    }

    let callbackFn = payload.callbackFn;
    
    try {
        const results = yield call (apiCall, `user/login`, user, null, 'POST')
        yield put({ type: LOGIN_SUCCESS , results})
        callbackFn();
    } catch (e) {
        console.log('asdsd')
        yield put({ type: LOGIN_FAILED, e})
    }

}

export default function* login() {
    yield takeLatest(LOGIN_START, loginUser);
}