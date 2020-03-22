import { put, call, takeLatest, delay } from 'redux-saga/effects';
import {LOGIN_FAILED,LOGIN_SUCCESS,LOGIN_START} from '../../consts'

//import { apiCall } from '../api'

const loginfunc = (credentials)=>{
    const logData = {
        username : "asd",
        password : "123",
    }
    return (credentials.username === logData.username && credentials.password === logData.password)

}

export function* loginUser({payload}){
    try{
        //const results = yield call(apiCall,`&s=${payload.movieName}`,null,null,'GET')
        yield delay(2000)
        loginfunc(payload) ? yield put({ type: LOGIN_SUCCESS}):  yield put({type: LOGIN_FAILED})
       // yield put({ type: LOGIN_SUCCESS})
    }catch(e){
        yield put({type: LOGIN_FAILED,e})
    }

}

export default function* login(){
    yield takeLatest(LOGIN_START, loginUser);
}