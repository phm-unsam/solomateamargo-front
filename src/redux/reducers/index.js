import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import  loginReducer  from './LoginReducer'

const rootReducer = combineReducers({
    cartReducer,
    loginReducer    
})

export default rootReducer