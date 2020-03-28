import {
    FLIGHT_LOAD,
    FLIGHT_LOAD_ERROR,
    FLIGHT_LOAD_FINISHED,
    LOAD_SEAT_FINISHED,
    LOAD_SEAT,
    LOAD_FILTERED_WINDOW_SEATS_FINISHED,
} from '../../consts'

const initialState = {
    flights: [],
    seat: [],
    error: null,
    loading: false,
    selectedFlight: null
}

export default function (state = initialState, action) {
    switch (action.type) {

        case FLIGHT_LOAD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case FLIGHT_LOAD:
            return {
                ...state,
                loading: action.payload
            }

        case FLIGHT_LOAD_FINISHED:
            return {
                ...state,
                error: false,
                loading: null,
                flights: action.results.data,
            }
        case LOAD_SEAT:
            return {
                ...state,
                selectedFlight: action.payload
            }

        case LOAD_SEAT_FINISHED:
            return {
                ...state,
                seat: action.results.data
            }

        case LOAD_FILTERED_WINDOW_SEATS_FINISHED:
            return {
                ...state,
                seat: action.results
            }
        default:
            return state
    }
}