import { put, call, takeLatest, take } from 'redux-saga/effects';
import { apiCall } from '../api'
import {
    FLIGHT_LOAD,
    FLIGHT_LOAD_FINISHED,
    FLIGHT_LOAD_ERROR,
    LOAD_SEAT,
    LOAD_SEAT_FINISHED,
    LOAD_SEAT_ERROR,
    LOAD_FILTERED_WINDOW_SEATS,
    LOAD_FILTERED_WINDOW_SEATS_FINISHED,
    LOAD_FILTERED_WINDOW_SEATS_ERROR,
    SEARCH_BY_DATE,
    SEARCH_BY_DATE_FINISHED,
    SEARCH_BY_DATE_ERROR
} from '../../consts'

export function* searchForAllFlights({ payload }) {
    const results = yield call(apiCall, `flights/getAlls`, payload, null, 'GET')
    try {
        yield put({ type: FLIGHT_LOAD_FINISHED, results })
    } catch (e) {
        yield put({ type: FLIGHT_LOAD_ERROR, e })
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



export function* windowSeats({ payload }) {
    let results = payload.filter(seat => seat.isNextToWindow)
    try {
        yield put({ type: LOAD_FILTERED_WINDOW_SEATS_FINISHED, results })
    } catch (e) {
        yield put({ type: LOAD_FILTERED_WINDOW_SEATS_ERROR, e })
    }
}

export function* flightSearchByDate() {
    const v1 = [
        {
            dateFrom: "11/07/2020",
            dateTo: "23/07/2020",
            seatClass: "",
            departure: "",
            arrival: ""
        },
    ]
    const results = yield call(apiCall, `flight/filter`, JSON.stringify(v1), null, 'GET')
    try {
        yield put({ type: SEARCH_BY_DATE_FINISHED, results })
    } catch (e) {
        yield put({ type: SEARCH_BY_DATE_ERROR, e })
    }
}



export default function* FlightSearch() {
    yield takeLatest(FLIGHT_LOAD, searchForAllFlights);
    yield takeLatest(LOAD_SEAT, loadSeats);
    yield takeLatest(LOAD_FILTERED_WINDOW_SEATS, windowSeats);
    yield takeLatest(SEARCH_BY_DATE, flightSearchByDate);
}
