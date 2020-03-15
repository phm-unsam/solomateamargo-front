import {
    CARRITO_DE_COMPRAS,
    CARRITO_DE_COMPRAS_EXITO,
    OBTENER_COMPRA_ELIMINAR,
    OBTENER_COMPRA_ELIMINAR_EXITO
} from '../types'
import compraAxios from '../config/axios'
export function obtenerCarritoDeCompras(compra) {
    return async (displatch) => {
        displatch(getCompras())

        try {
            const respuesta = await compraAxios.get('/carroDeCompras')
            displatch(descargaCarroExitosoExitosa(respuesta.data))
        } catch (error) {
            console.log(error)
        }
    }
}

const getCompras = () => ({
    type: CARRITO_DE_COMPRAS,
    payload: true

})

const descargaCarroExitosoExitosa = compras => ({
    type: CARRITO_DE_COMPRAS_EXITO,
    payload: compras
})

//selecciona y elimina la compra

export function borrarCompraAction(id){
    return async (displatch) => {
        displatch(obtenerCompraEliminar(id))
        
        try {
            await compraAxios.delete(`carroDeCompras/${id}`)
            displatch(eliminarCompraExito())
        } catch (error) {
            console.log(error)
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