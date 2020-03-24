import {
    CART_LOAD, 
    CART_LOAD_ERROR, 
    CART_LOAD_FINISHED,
    DELETE_FLIGHT_RESERVATION, 
    DELETE_ALL_CART, 
    DELETE_ALL_CART_FINISHED
} from '../../consts'

export const cartLoad = () => ({
    type: CART_LOAD,
    payload: true
});

export const cartLoadFinished = flights => ({
    type:CART_LOAD_FINISHED,
    payload: flights
})
export const cartLoadError = () => ({
    type:   CART_LOAD_ERROR,
    payload: true
})

export const deleteFlightReservation = id => ({
    type: DELETE_FLIGHT_RESERVATION,
    payload: id
})


export const deleteAll = () => ({
    type: DELETE_ALL_CART,
    payload:true
});

export const deleteAllFinished = () => ({
    type: DELETE_ALL_CART_FINISHED,
    payload: null
})