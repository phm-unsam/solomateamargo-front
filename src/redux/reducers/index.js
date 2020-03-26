import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import  login  from './LoginReducer'
import FlightSearchReducer from './FlightSearchReducer'
const rootReducer = combineReducers({
    cartReducer,
    login,
    FlightSearchReducer, 
})

export default rootReducer