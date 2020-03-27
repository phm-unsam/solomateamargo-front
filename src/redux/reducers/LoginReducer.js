import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS } from '../../consts/'
const initialState = {
    isLoading: false,
    isLogged: false
}

export default function (state = initialState, action) {
    const response = action.results
    switch (action.type) {
        case LOGIN_START:
            return { ...state, isLoading: true }
        case LOGIN_FAILED:
            console.log(action.e.response.data)
            return { ...state, isLoading: false }
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false , isLogged: true, ...response.data}
        default: return { ...state }
    }
}
