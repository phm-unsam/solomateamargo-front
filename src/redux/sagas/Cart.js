import { put, takeLatest, call} from 'redux-saga/effects';
import Swal from 'sweetalert2'
import CartService from '../../services/cartService'
import {
    CART_LOAD,
    CART_LOAD_FINISHED,
    CART_LOAD_ERROR,
    DELETE_FLIGHT_RESERVATION,
    DELETE_FLIGHT_RESERVATION_ERROR,
    DELETE_ALL_CART,
    DELETE_ALL_CART_ERROR,
    BUY_CART,
    BUY_CART_FINISHED,
    BUY_CART_ERROR,
} from '../../consts'
 
export const ROOT_SERVER_URL = 'http://localhost:16000/'
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
        text: 'No posee dinero suficiente.',
    })
}

export function* cartLoad({ payload }) {
    try {
        const  results = yield call(cartService.cartLoad,( payload.loggedId))
        yield put({ type: CART_LOAD_FINISHED, results })
        
    } catch (error) {
        yield put({ type: CART_LOAD_ERROR, error })
    }
}

export function* deleteFlight({ payload }) {
    try {
        yield call(cartService.deleteFlight,(payload))
        callbackSwal('Eliminado!', 'su vuelo a sido eliminado del carrito ')
        yield put({ type: CART_LOAD, payload })
    } catch (error) {
        yield put({ type: DELETE_FLIGHT_RESERVATION_ERROR, error })
    }
}

export function* deleteAll({ payload }) {
    try {
        yield call (cartService.deleteAll,(payload.loggedId))
        yield put({ type: CART_LOAD, payload })
    } catch (error) {
       yield put({type: DELETE_ALL_CART_ERROR, error})
    }
}

export function* buyTicket({ payload }) {
    
    try {
        const results = yield call(cartService.buyTicket,(payload))
        callbackSwal('Comprado!', 'su vuelo a sido comprado')
        yield put({ type: BUY_CART_FINISHED, results })
        yield put({ type: CART_LOAD, payload })
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