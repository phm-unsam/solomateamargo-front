import { put, call, takeLatest} from 'redux-saga/effects';
import apiCall from '../../config/axios'
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
    BUY_CART_FINISHED
} from '../../consts'


export function*  cartLoad(){
    const results = yield call(apiCall, 'get', 'http://localhost:4000/asdad');
    try{
        yield put({type: CART_LOAD_FINISHED, results})
    }catch(error){
        console.log('asdsd')
        yield put({type: CART_LOAD_ERROR ,error})
    }
}

export function* deleteFlight({payload}){
    try {
        const results = yield call(apiCall, 'delete', `http://localhost:4000/carroDeCompras/${payload}`);
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

export function* deleteAll(){
    try {
        const results = yield call(apiCall, 'post', 'http://localhost:4000/carroDeCompras');
        yield put({type: DELETE_ALL_CART_FINISHED, results})
    } catch (error) {
        console.log(error)
    }
}

export function* buyTicket(payload){
    try {
        const respuesta =JSON.stringify({
            id: payload.id,
            origin: payload.payload.origin,
            destination: payload.payload.exit,
            airport: payload.payload.airport,
            seat: payload.payload.seat,
            flightClass: payload.payload.flightClass,
            price: payload.payload.price
        })
        console.log(payload)
        const results = yield call(apiCall, 'POST', 'http://localhost:5000/flight', respuesta );
        Swal.fire(
            'Comprado!',
            'Your file has been deleted.',
            'success'
          )
        console.log(payload)
        yield put({type: BUY_CART_FINISHED, results})
    } catch (error) {
        console.log(error)
    }
}


export default function* Cart(){
    yield takeLatest(CART_LOAD, cartLoad)
    yield takeLatest(DELETE_FLIGHT_RESERVATION, deleteFlight);
    yield takeLatest(DELETE_ALL_CART, deleteAll);
    yield takeLatest(BUY_CART, buyTicket);
}