import { combineReducers } from 'redux'
import reducer from './carritoDeComprasReducer'

export default combineReducers({
    compras: reducer
})