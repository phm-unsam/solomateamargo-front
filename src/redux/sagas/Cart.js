import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios'
import Swal from 'sweetalert2'
import CartService from '../../services/cartService'
import {
    CART_LOAD,
    CART_LOAD_FINISHED,
    CART_LOAD_ERROR,
    DELETE_FLIGHT_RESERVATION,
    DELETE_FLIGHT_RESERVATION_FINISHED,
    DELETE_FLIGHT_RESERVATION_ERROR,
    DELETE_ALL_CART,
    DELETE_ALL_CART_FINISHED,
    DELETE_ALL_CART_ERROR,
    BUY_CART,
    BUY_CART_FINISHED,
    BUY_CART_ERROR,
} from '../../consts'
export const REST_SERVER_URL = 'http://localhost:16000/'
const cartService = new CartService()
const callbackSwal = (title, descripcion) => {
    Swal.fire(
        title,
        descripcion,
        'success'
    )
}

const callbackSwalError = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'no posee sufuciente dinero, estas pobre!',
        footer: '<a href>Why do I have this issue?</a>'
    })
}

export function* cartLoad({ payload }) {
    let results
    try {
       yield cartService.cartLoad( payload ).then((response) => {
        results = response
        })
        yield put({ type: CART_LOAD_FINISHED, results })
        
    } catch (error) {
        yield put({ type: CART_LOAD_ERROR, error })
    }
}

export function* deleteFlight({ payload, loginUser }) {

    let results
    try {
        yield cartService.deleteFlight(payload, loginUser).then((response) => {
            results = response
        })
        
        callbackSwal('Eliminado!', 'su vuelo a sido eliminado del carrito ')
        yield put({ type: DELETE_FLIGHT_RESERVATION_FINISHED, results })
    } catch (error) {
        console.log(error.response)
        yield put({ type: DELETE_FLIGHT_RESERVATION_ERROR, error })
    }
}

export function* deleteAll({ payload }) {
    let results
    try {
        yield cartService.deleteAll(payload).then((response) => {
            results = response
        })
        yield put({ type: DELETE_ALL_CART_FINISHED, results })
    } catch (error) {
       yield put({type: DELETE_ALL_CART_ERROR, error})
    }
}

export function* buyTicket({ payload }) {
    let results
    try {
        yield cartService.buyTicket(payload).then((response) => {
            results = response
        })
        callbackSwal('Comprado!', 'su vuelo a sido comprado')
        yield put({ type: BUY_CART_FINISHED, results })

    } catch (error) {
        callbackSwalError()
        yield put({ type: BUY_CART_ERROR, error })
    }
}


export default function* Cart() {
    yield takeLatest(CART_LOAD, cartLoad)
    yield takeLatest(DELETE_FLIGHT_RESERVATION, deleteFlight);
    yield takeLatest(DELETE_ALL_CART, deleteAll);
    yield takeLatest(BUY_CART, buyTicket);
}