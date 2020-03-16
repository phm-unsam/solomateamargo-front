
import compraAxios from '../../config/axios';

export const CARRITO_DE_COMPRAS = 'LISTADO_COMPRAS'
export const CARRITO_DE_COMPRAS_EXITO = 'LISTADO_COMPRAS_EXITO'
export const OBTENER_COMPRA_ELIMINAR = 'OBTENER_COMPRA_ELIMINAR'
export const OBTENER_COMPRA_ELIMINAR_EXITO = 'OBTENER_COMPRA_ELIMINAR_EXITO'



export function obtenerCarritoDeCompras(compra) {
    return async (dispatch) => {
        dispatch(getCompras());
        try {
            const respuesta = await compraAxios.get('/carroDeCompras');
            dispatch(descargaCarroExitosoExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const getCompras = () => ({
    type: CARRITO_DE_COMPRAS,
    payload: true
});

const descargaCarroExitosoExitosa = compras => ({
    type: CARRITO_DE_COMPRAS_EXITO,
    payload: compras
});

//selecciona y elimina la compra
export function borrarCompraAction(id){
    return async (dispatch) => {
        dispatch(obtenerCompraEliminar(id));
        try {
            await compraAxios.delete(`carroDeCompras/${id}`);
            dispatch(eliminarCompraExito());
        } catch (error) {
            console.log(error);
        }
    }
}

const obtenerCompraEliminar = id => ({
    type: OBTENER_COMPRA_ELIMINAR,
    payload: id
})

const eliminarCompraExito = () =>({
    type: OBTENER_COMPRA_ELIMINAR_EXITO
})