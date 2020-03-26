import { put, call, takeLatest, take } from 'redux-saga/effects';
import { apiCall } from '../api'
import {
    FLIGHT_SEARCH_LOAD,
    FLIGHT_SEARCH_LOAD_FINISHED,
    FLIGHT_SEARCH_LOAD_ERROR,
    SEARCH_BY_DATE,
    SEARCH_BY_DATE_FINISHED,
    SEARCH_BY_DATE_ERROR
} from '../../consts'

export function* searchForAllFlights({ payload }) {
    const results = yield call(apiCall, `flights/getAll`, payload, null, 'GET')
    try {
        yield put({ type: FLIGHT_SEARCH_LOAD_FINISHED, results })
    } catch (e) {
        yield put({ type: FLIGHT_SEARCH_LOAD_ERROR, e })
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
    yield takeLatest(SEARCH_BY_DATE, flightSearchByDate);
}
