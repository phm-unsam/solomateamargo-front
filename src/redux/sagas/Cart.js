import { put, call, takeLatest,delay } from 'redux-saga/effects';
import apiCall from '../../config/axios'
import {CART_LOAD, 
    CART_LOAD_FINISHED, 
    CART_LOAD_ERROR, 
    DELETE_FLIGHT_RESERVATION, 
    DELETE_FLIGHT_RESERVATION_FINISHED, 
    DELETE_ALL_CART, 
    DELETE_ALL_CART_FINISHED} from '../../consts'

export function*  cartLoad(){
    delay(10000)
    try{
        const results = yield call(apiCall, 'get', 'http://localhost:4000/carroDeCompras');
        yield put({type: CART_LOAD_FINISHED, results})
    }catch(error){
        yield put({type: CART_LOAD_ERROR,error})
    }
}

export function* deleteFlight({payload}){
    try {
        const results = yield call(apiCall, 'delete', `http://localhost:4000/carroDeCompras/${payload}`);
        yield put({type: DELETE_FLIGHT_RESERVATION_FINISHED, results})
    } catch (error) {
        console.log(error)
    }
}

export function* deleteAll(){
    try {
        const results = yield call(apiCall, 'post', 'http://localhost:4000/carroDeCompras');
        yield put({type: DELETE_ALL_CART_FINISHED, results})
    } catch (error) {
        console.log(error)
    }
}


export default function* Cart(){
    yield takeLatest(CART_LOAD, cartLoad)
    yield takeLatest(DELETE_FLIGHT_RESERVATION, deleteFlight);
    yield takeLatest(DELETE_ALL_CART, deleteAll);
}