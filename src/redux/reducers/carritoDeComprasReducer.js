
export const CARRITO_DE_COMPRAS = 'LISTADO_COMPRAS'
export const CARRITO_DE_COMPRAS_EXITO = 'LISTADO_COMPRAS_EXITO'
export const OBTENER_COMPRA_ELIMINAR = 'OBTENER_COMPRA_ELIMINAR'
export const OBTENER_COMPRA_ELIMINAR_EXITO = 'OBTENER_COMPRA_ELIMINAR_EXITO'

const initialState = {
    compras: [],
    loading: false,
    compraEliminar: null
}

export default function(state= initialState, action){
    switch(action.type){
        case CARRITO_DE_COMPRAS:
        case CARRITO_DE_COMPRAS_EXITO:
            return{
                ...state,
                loading: false,
                compras: action.payload
            }

        case OBTENER_COMPRA_ELIMINAR:
            return{
                ...state,
                compraEliminar: action.payload
            }

        case OBTENER_COMPRA_ELIMINAR_EXITO:
            return{
                ...state,
                compras: state.compras.filter(compra => compra.id !== state.compraEliminar)
            }
            
        default:
            return state
    }
}
