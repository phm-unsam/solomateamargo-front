import {
    CART_LOAD, 
    CART_LOAD_FINISHED,
    DELETE_FLIGHT_RESERVATION, 
    DELETE_ALL_CART, 
    BUY_CART,
} from '../../consts'

export const cartLoad = userId => ({
    type: CART_LOAD,
    payload: userId
});

export const cartLoadFinished = flights => ({
    type: CART_LOAD_FINISHED,
    payload: flights
});

export const deleteFlightReservation = (flight, loginUser) => ({
    type: DELETE_FLIGHT_RESERVATION,
    payload: flight,
    loginUser: loginUser
})

export const deleteAll = userId => ({
    type: DELETE_ALL_CART,
    payload: userId
});


export const buyTicket = userId => ({
    type: BUY_CART,
    payload: userId
})

