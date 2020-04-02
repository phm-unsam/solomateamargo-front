import { put, call, takeLatest,delay } from 'redux-saga/effects';
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_START } from '../../consts'
import { apiCall } from '../api'

export function* loginUser({ payload }) {
    const callbackFn = payload.callbackFn;

    try {
        const results = yield call (apiCall, `user/login`, payload, null, 'POST')
        yield delay(1000)//para simular espera del servidor
        yield put({ type: LOGIN_SUCCESS , results})
        yield call (callbackFn)
    } catch (e) {
        yield put({ type: LOGIN_FAILED, results : e.response.data})
    }

}

export default function* login() {
    yield takeLatest(LOGIN_START, loginUser);
}