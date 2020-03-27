import {
    FLIGHT_SEARCH_LOAD,
    LOAD_SEAT,
    LOAD_SEAT_FINISHED,
    LOAD_SEAT_ERROR
} from '../../consts'

export const flightSearchLoad = () => ({
    type: FLIGHT_SEARCH_LOAD,
    payload: true
})

export const loadSeat = flight => ({
    type: LOAD_SEAT,
    payload: flight
})