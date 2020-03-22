import { put, call, takeEvery,delay } from 'redux-saga/effects';
import {LOGIN_FAILED,LOGIN_SUCCESS,LOGIN_START} from '../../consts'

//import { apiCall } from '../api'

export function* loginUser({payload}){
    try{
        //const results = yield call(apiCall,`&s=${payload.movieName}`,null,null,'GET')
        yield delay(2000)
        yield put({ type: LOGIN_SUCCESS})
    }catch(e){
        yield put({type: LOGIN_FAILED,e})
    }

}

export default function* login(){
    yield takeEvery(LOGIN_START, loginUser);
}