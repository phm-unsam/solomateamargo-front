import {combineReducers} from 'redux'
import comprasReducer from './carritoDeComprasReducer'

export default combineReducers({
    compras: comprasReducer
})