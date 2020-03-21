import { combineReducers } from 'redux'
import cartReducer from './cartReducer'

export default combineReducers({
    flights: cartReducer,
    vuelos : "euge gato",
})