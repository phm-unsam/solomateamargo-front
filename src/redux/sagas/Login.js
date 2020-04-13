import { put, call, takeLatest,delay } from 'redux-saga/effects';
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_START } from '../../consts'
import LoginService from '../../services/loginService';

export function* loginUser({ payload }) {
    const loginService = new LoginService();
    const callbackFn = payload.callbackFn;

    try {
        const results = yield call (loginService.login,(payload));
        yield delay(1000)//para simular espera del servidor
        yield put({ type: LOGIN_SUCCESS , results})
        yield call (callbackFn)
    } catch (e) {
        yield put({ type: LOGIN_FAILED, results : e.response})
    }

}

export default function* login() {
    yield takeLatest(LOGIN_START, loginUser);
}