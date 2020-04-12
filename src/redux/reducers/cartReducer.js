import {
    CART_LOAD,
    CART_LOAD_FINISHED,
    CART_LOAD_ERROR,
    DELETE_FLIGHT_RESERVATION,
    DELETE_ALL_CART,
    BUY_CART_FINISHED,
    BUY_CART_ERROR,
} from '../../consts'

const initialState = {
    flights: [],
    selectedFlight: null,
    error: null,
    loading: false,
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
                flights: action.results.data,
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
