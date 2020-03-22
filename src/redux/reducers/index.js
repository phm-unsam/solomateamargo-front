import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import  login  from './LoginReducer'

const rootReducer = combineReducers({
    cartReducer,
    login 
})

export default rootReducer