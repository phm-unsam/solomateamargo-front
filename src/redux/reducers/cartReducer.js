
export const CART_LOAD = 'CART_LOAD'
export const CART_LOAD_FINISHED = 'CART_LOAD_FINISHED'
export const DELETE_FLIGHT_RESERVATION = 'DELETE_FLIGHT_RESERVATION'
export const DELETE_FLIGHT_RESERVATION_FINISHED = 'DELETE_FLIGHT_RESERVATION_FINISHED'

const initialState = {
    flights: [],
    loading: false,
    compraEliminar: null
}

export default function(state= initialState, action){
    switch(action.type){
        case CART_LOAD:
        case CART_LOAD_FINISHED:
            return{
                ...state,
                loading: false,
                flights: action.payload
            }

        case DELETE_FLIGHT_RESERVATION:
            return{
                ...state,
                compraEliminar: action.payload
            }

        case DELETE_FLIGHT_RESERVATION_FINISHED:
            return{
                ...state,
                flights: state.flights.filter(flight => flight.id !== state.compraEliminar)
            }
            
        default:
            return state
    }
}
