import { put, call, takeLatest } from 'redux-saga/effects';
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_START } from '../../consts'
import { apiCall } from '../api'


export function* loginUser({ payload }) {
    try {
        const results = yield call (apiCall,`user/login`,payload ,null,'POST')
        yield put({ type: LOGIN_SUCCESS , results})
    } catch (e) {
        console.log('asdsd')
        yield put({ type: LOGIN_FAILED, e})
    }

}

export default function* login() {
    yield takeLatest(LOGIN_START, loginUser);
}