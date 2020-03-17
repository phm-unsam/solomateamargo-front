
import cartAxios from '../../config/axios';

export const CART_LOAD = 'CART_LOAD'
export const CART_LOAD_FINISHED = 'CART_LOAD_FINISHED'
export const DELETE_FLIGHT_RESERVATION = 'DELETE_FLIGHT_RESERVATION'
export const DELETE_FLIGHT_RESERVATION_FINISHED = 'DELETE_FLIGHT_RESERVATION_FINISHED'



export function getCart() {
    return async (dispatch) => {
        dispatch(cartLoad());
        try {
            const respuesta = await cartAxios.get('/carroDeCompras');
            dispatch(cartLoadFinished(respuesta.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const cartLoad = () => ({
    type: CART_LOAD,
    payload: true
});

const cartLoadFinished = compras => ({
    type: CART_LOAD_FINISHED,
    payload: compras
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