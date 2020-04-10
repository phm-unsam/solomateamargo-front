import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS } from '../../consts/'
const initialState = {
    isLoading: false,
    isLogged: false,
    error : false,
    ...JSON.parse(localStorage.getItem('login'))
}

export default function (state = initialState, action) {
    const response = action.results
    switch (action.type) {
        case LOGIN_START:
            return { ...state, isLoading: true }
        case LOGIN_FAILED:
            return { ...state, isLoading: false, msg: response, error:true}
        case LOGIN_SUCCESS:
            localStorage.setItem('login', JSON.stringify({...response.data, isLogged:true}))
            return {isLoading: false , isLogged: true, ...response.data}
        default: return { ...state }
    }
}
