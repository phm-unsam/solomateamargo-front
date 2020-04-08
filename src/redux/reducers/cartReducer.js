import {
    CART_LOAD,
    CART_LOAD_FINISHED,
    CART_LOAD_ERROR,
    DELETE_FLIGHT_RESERVATION,
    DELETE_FLIGHT_RESERVATION_ERROR,
    DELETE_FLIGHT_RESERVATION_FINISHED,
    DELETE_ALL_CART,
    DELETE_ALL_CART_FINISHED,
    BUY_CART_FINISHED,
    BUY_CART_ERROR
} from '../../consts'

const initialState = {
    flights: [],
    selectedFlight: null,
    error: null,
    loading: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_ALL_CART:
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
                flights: action.results.data,
            }
        case DELETE_FLIGHT_RESERVATION_ERROR:
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
                loading: action.results
            }

        case DELETE_ALL_CART_FINISHED:
            return {
                ...state,
                loading: false
            }

        case BUY_CART_FINISHED:
            return {
                ...state,
                loading: false,
            }

        case BUY_CART_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
