
import cartAxios from '../../config/axios';

export const CART_LOAD = 'CART_LOAD'
export const DELETE_FLIGHT_RESERVATION = 'DELETE_FLIGHT_RESERVATION'
export const DELETE_FLIGHT_RESERVATION_FINISHED = 'DELETE_FLIGHT_RESERVATION_FINISHED'



export function getCart() {
    return async (dispatch) => {
        try {
            const respuesta = await cartAxios.get('/carroDeCompras');
            dispatch(cardLoad(respuesta.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const cardLoad = flight => ({
    type: CART_LOAD,
    payload: flight
});


//selecciona y elimina la compra
export function deleteFlightAction(id) {
    return async (dispatch) => {
        dispatch(deleteFlightReservation(id));
        try {
            await cartAxios.delete(`carroDeCompras/${id}`);
            dispatch(deleteFlightReservationFinished());
        } catch (error) {
            console.log(error);
        }
    }
}

const deleteFlightReservation = id => ({
    type: DELETE_FLIGHT_RESERVATION,
    payload: id
})

const deleteFlightReservationFinished = () => ({
    type: DELETE_FLIGHT_RESERVATION_FINISHED
})