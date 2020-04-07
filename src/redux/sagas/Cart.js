import { put, call, takeLatest, delay} from 'redux-saga/effects';
import { apiCall } from '../api'
import Swal from 'sweetalert2' 
import {
    CART_LOAD, 
    CART_LOAD_FINISHED, 
    CART_LOAD_ERROR, 
    DELETE_FLIGHT_RESERVATION, 
    DELETE_FLIGHT_RESERVATION_FINISHED, 
    DELETE_ALL_CART, 
    DELETE_ALL_CART_FINISHED,
    BUY_CART,
    BUY_CART_FINISHED,
    BUY_CART_ERROR
} from '../../consts'


export function*  cartLoad({payload}){
    const results = yield call (apiCall, `user/${payload}/cart`, null, null, 'GET')
    delay(1000)
    try{
        yield put({type: CART_LOAD_FINISHED, results})
    }catch(error){
        yield put({type: CART_LOAD_ERROR ,error})
    }
}

export function* deleteFlight({payload, loginUser}){
    const {id, seatNumber} = payload
    const results = yield call (apiCall, `user/${loginUser}/cart/remove?flightId=${id}&seatNumber=${seatNumber}`, null, null, 'POST')
    console.log(results)
        try{
        Swal.fire(
            'Eliminado!',
            'Your file has been deleted.',
            'success'
          )
        yield put({type: DELETE_FLIGHT_RESERVATION_FINISHED, results})
    } catch (error) {
        console.log(error)
    }
}

export function* deleteAll({payload}){
    try {
        const results = yield call (apiCall, `user/${payload}/cart/clear`, null, null, 'DELETE')
        yield put({type: DELETE_ALL_CART_FINISHED, results})
    } catch (error) {
        console.log(error)
    }
}

export function* buyTicket({payload}){
    try {
        const results = yield call (apiCall, `user/${payload}/cart/purchase`, null, null, 'POST')
        Swal.fire(
            'Comprado!',
            'Your file has been deleted.',
            'success'
          )
          yield put({type: BUY_CART_FINISHED, results})
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'no posee sufuciente dinero, estas pobre!',
                footer: '<a href>Why do I have this issue?</a>'
              })
            console.log(payload)
        yield put({type: BUY_CART_ERROR ,error})
    }
}


export default function* Cart(){
    yield takeLatest(CART_LOAD, cartLoad)
    yield takeLatest(DELETE_FLIGHT_RESERVATION, deleteFlight);
    yield takeLatest(DELETE_ALL_CART, deleteAll);
    yield takeLatest(BUY_CART, buyTicket);
}