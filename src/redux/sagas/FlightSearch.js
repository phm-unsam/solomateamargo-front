import { put, call, takeLatest } from 'redux-saga/effects';
import { apiCall } from '../api'
import {
    FLIGHT_LOAD,
    FLIGHT_LOAD_FINISHED,
    FLIGHT_LOAD_ERROR,
    SEAT_LOAD,
    SEAT_LOAD_FINISHED,
    SEAT_LOAD_ERROR,
    LOAD_FILTERED_WINDOW_SEATS,
    LOAD_FILTERED_WINDOW_SEATS_FINISHED,
    LOAD_FILTERED_WINDOW_SEATS_ERROR,
    SEARCH_BY_DATE,
    SEARCH_BY_DATE_FINISHED,
    SEARCH_BY_DATE_ERROR,
    ADD_CART_LOAD_ERROR,
    ADD_CART_LOAD,
    ADD_CART_LOAD_FINISHED
} from '../../consts'

export function* searchForAllFlights({ payload }) {
    const results = yield call(apiCall, `flights`, payload, null, 'GET')
    try {
        yield(results)
        yield put({ type: FLIGHT_LOAD_FINISHED, results })
    } catch (e) {
        yield put({ type: FLIGHT_LOAD_ERROR, e })
    }

}

export function* loadSeats({ payload }) {
    const results = yield call(apiCall, `flight/${payload}/seats`, payload, null, 'GET')
    try {
        yield put({ type: SEAT_LOAD_FINISHED, results })
    } catch (e) {
        yield put({ type: SEAT_LOAD_ERROR, e })
    }
}

export function* windowSeats({ payload }) {
    let results = payload.filter(seat => seat.isNextToWindow)
    try {
        yield put({ type: LOAD_FILTERED_WINDOW_SEATS_FINISHED, results })
    } catch (e) {
        yield put({ type: LOAD_FILTERED_WINDOW_SEATS_ERROR, e })
    }
}

// export function* flightSearchByDate() {
//     const v1 = [
//         {
//             dateFrom: "11/07/2020",
//             dateTo: "23/07/2020",
//             seatClass: "",
//             departure: "",
//             arrival: ""
//         },
//     ]
//     const results = yield call(apiCall, `flight/filter`, JSON.stringify(v1), null, 'GET')
//     try {
//         yield put({ type: SEARCH_BY_DATE_FINISHED, results })
//     } catch (e) {
//         yield put({ type: SEARCH_BY_DATE_ERROR, e })
//     }
// }


export function* addCart({payload}) {

    const {flightId, seatNumber} = payload

    const results = yield call(apiCall, `user/${payload.id}/cart/add?flightId=${flightId}&seatNumber=${seatNumber}`,null, null, 'POST')
    try {
        yield put({ type: ADD_CART_LOAD_FINISHED, results })
    } catch (e) {
        yield put({ type: ADD_CART_LOAD_ERROR, e })
    }
}


export default function* FlightSearch() {
    yield takeLatest(FLIGHT_LOAD, searchForAllFlights);
    yield takeLatest(SEAT_LOAD, loadSeats);
    yield takeLatest(LOAD_FILTERED_WINDOW_SEATS, windowSeats);
    // yield takeLatest(SEARCH_BY_DATE, flightSearchByDate);
    yield takeLatest(ADD_CART_LOAD, addCart);
}
