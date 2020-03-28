import {
    FLIGHT_SEARCH_LOAD,
    LOAD_SEAT,
    LOAD_SEAT_FINISHED,
    LOAD_SEAT_ERROR,
    LOAD_FILTERED_WINDOW_SEATS,
    LOAD_FILTERED_WINDOW_SEATS_FINISHED,
    LOAD_FILTERED_WINDOW_SEATS_ERROR,
    
} from '../../consts'

export const flightSearchLoad = () => ({
    type: FLIGHT_SEARCH_LOAD,
    payload: true
})

export const loadSeat = flight => ({
    type: LOAD_SEAT,
    payload: flight
})

export const filteredWindowSeats = (seats) => ({
    type: LOAD_FILTERED_WINDOW_SEATS,
    payload: seats,
})
