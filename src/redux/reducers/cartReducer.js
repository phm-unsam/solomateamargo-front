import {
    CART_LOAD,
    CART_LOAD_FINISHED,
    CART_LOAD_ERROR,
    DELETE_FLIGHT_RESERVATION,
    DELETE_FLIGHT_RESERVATION_FINISHED,
    DELETE_ALL_CART,
    DELETE_ALL_CART_FINISHED,
    BUY_CART_FINISHED
} from '../../consts'

const initialState = {
    flights: [],
    selectedFlight: null,
    error: null,
    loading: false,
    buyTicket: []
}

export default function (state = initialState, action) {
    switch (action.type) {

        case CART_LOAD:
            return {
                ...state,
                loading: action.payload
            }
        case CART_LOAD_FINISHED:
            return {
                ...state,
                error: false,
                loading: null,
                flights: action.results,
            }

        case CART_LOAD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_FLIGHT_RESERVATION:
            return {
                ...state,
                selectedFlight: action.payload
            }

        case DELETE_FLIGHT_RESERVATION_FINISHED:
            return {
                ...state,
                flights: state.flights.filter(flight => flight.id !== state.selectedFlight)
            }

        case DELETE_ALL_CART:
            return {
                ...state,
                flights: action.payload
            }

        case DELETE_ALL_CART_FINISHED:
            return {
                flights: action.results
            }
        case BUY_CART_FINISHED:
            return {
                ...state,
                buyTicket: [...state.flights]

            }
        default:
            return state
    }
}
