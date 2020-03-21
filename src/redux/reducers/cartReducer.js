import { CART_LOAD,
    DELETE_FLIGHT_RESERVATION ,
    DELETE_FLIGHT_RESERVATION_FINISHED, 
    DELETE_ALL_CART,} from '../../consts/'

const initialState = {
    flights: [],
    selectedFlight: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CART_LOAD:
            return {
                ...state,
                flights: action.payload
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
                flights: []
            }

        default:
            return state
    }
}
