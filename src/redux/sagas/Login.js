import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_START, LOGOUT } from '../../consts'
import loginService from '../../services/loginService';
import sesionService from '../../services/sessionService';
import sessionService from '../../services/sessionService';

export function* loginUser({ payload }) {
    const callbackFn = payload.callbackFn;
    try {
        const results = yield call(loginService.login, (payload));
        yield delay(750)//para simular espera del servidor
        sesionService.createSession(results)
        yield put({ type: LOGIN_SUCCESS, results })
        yield call(callbackFn)
    } catch (e) {
        yield put({ type: LOGIN_FAILED, results: e.response.data })
    }
}

export function* logoutUser({ payload }) {
    yield call (sessionService.deleteSession)
}

export default function* login() {
    yield takeLatest(LOGIN_START, loginUser);
    yield takeLatest(LOGOUT, logoutUser);
}