import {
    CART_LOAD, 
    CART_LOAD_FINISHED,
    DELETE_FLIGHT_RESERVATION, 
    DELETE_ALL_CART, 
    BUY_CART,
} from '../../consts'

export const cartLoad = (payload) => ({
    type: CART_LOAD,
    payload: payload
});

export const cartLoadFinished = flights => ({
    type: CART_LOAD_FINISHED,
    payload: flights
});

export const deleteFlightReservation = (flight, loginUser) => ({
    type: DELETE_FLIGHT_RESERVATION,
    payload: {ticket : flight, loggedId:loginUser}
})

export const deleteAll = userId => ({
    type: DELETE_ALL_CART,
    payload: {loggedId:userId}
});


export const buyTicket = userId => ({
    type: BUY_CART,
    payload: {loggedId:userId}
})

