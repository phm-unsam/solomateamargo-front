import { put, call, takeLatest, take } from 'redux-saga/effects';
import { apiCall } from '../api'
import {
    FLIGHT_SEARCH_LOAD,
    FLIGHT_SEARCH_LOAD_FINISHED,
    FLIGHT_SEARCH_LOAD_ERROR,
    LOAD_SEAT,
    LOAD_SEAT_FINISHED,
    LOAD_SEAT_ERROR,
    LOAD_FILTERED_WINDOW_SEATS,
    LOAD_FILTERED_WINDOW_SEATS_FINISHED,
    LOAD_FILTERED_WINDOW_SEATS_ERROR
} from '../../consts'

export function* searchForAllFlights({ payload }) {
    const results = yield call(apiCall, `flights/getAll`, payload, null, 'GET')
    try {
        yield put({ type: FLIGHT_SEARCH_LOAD_FINISHED, results })
    } catch (e) {
        yield put({ type: FLIGHT_SEARCH_LOAD_ERROR, e })
    }

}




export function* loadSeats({ payload }) {
    const results = yield call(apiCall, `flight/${payload}/seats`, payload, null, 'GET')
    try {
        yield put({ type: LOAD_SEAT_FINISHED, results })
    } catch (e) {
        yield put({ type: LOAD_SEAT_ERROR, e })
    }
}



export function* windowSeats({ payload}) {
    let results = payload.filter(seat => seat.isNextToWindow)
    try {
        yield put({ type: LOAD_FILTERED_WINDOW_SEATS_FINISHED, results })
    } catch (e) {
        yield put({ type: LOAD_FILTERED_WINDOW_SEATS_ERROR, e })
    }
}

export function* flightSearchByDate() {
    // const results = yield call(apiCall, `flights/getAll`, payload, null, 'GET')
    // try {
    //     yield put({ type: SEARCH_BY_DATE_FINISHED, results })
    // } catch (e) {
    //     yield put({ type: SEARCH_BY_DATE_ERROR, e })
    // }
}



export default function* FlightSearch() {
    yield takeLatest(FLIGHT_SEARCH_LOAD, searchForAllFlights);
    yield takeLatest(LOAD_SEAT, loadSeats);
    yield takeLatest(LOAD_FILTERED_WINDOW_SEATS, windowSeats);

}
