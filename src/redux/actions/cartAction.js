import {
    CART_LOAD, 
    CART_LOAD_FINISHED,
    CART_LOAD_ERROR, 
    DELETE_FLIGHT_RESERVATION, 
    DELETE_ALL_CART, 
    BUY_CART,
} from '../../consts'

export const loadSeat = () => ({

})

export const cartLoad = () => ({
    type: CART_LOAD,
    payload: true
});

export const cartLoadFinished = flights => ({
    type: CART_LOAD_FINISHED,
    payload: flights
});

export const cartLoadError = () => ({
    type:   CART_LOAD_ERROR,
    payload: true
})

export const deleteFlightReservation = id => ({
    type: DELETE_FLIGHT_RESERVATION,
    payload: id
})


export const deleteAll = flights => ({
    type: DELETE_ALL_CART,
    payload: flights
});


export const buyTicket = ticket => ({
    type: BUY_CART,
    payload: ticket
})


