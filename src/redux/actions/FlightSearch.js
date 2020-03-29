import {
    FLIGHT_LOAD,
    FLIGHT_LOAD_ERROR,
    SEAT_LOAD,
    SEAT_LOAD_ERROR,
    LOAD_FILTERED_WINDOW_SEATS,
    LOAD_FILTERED_WINDOW_SEATS_ERROR,
    SEARCH_BY_DATE,
    ADD_CART_LOAD
} from '../../consts'

export const flightLoad = () => ({
    type: FLIGHT_LOAD,
    payload: true
})


export const flightError = () => ({
    type: FLIGHT_LOAD_ERROR,
    payload: true
})

export const seatLoad = flight => ({
    type: SEAT_LOAD,
    payload: flight
})

export const seatLoadError = () => ({
    type: SEAT_LOAD_ERROR,
    payload: true
})

export const filteredWindowSeats = (seats) => ({
    type: LOAD_FILTERED_WINDOW_SEATS,
    payload: seats,
})

export const searchByDate = () => ({
    type: SEARCH_BY_DATE,
    payload: true
})

export const addCartLoad = flight => ({
    type: ADD_CART_LOAD,
    payload: flight
})