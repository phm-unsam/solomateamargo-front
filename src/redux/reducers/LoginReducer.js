import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from '../../consts/'
import sessionService from '../../services/sessionService'
const initialState = {
    isLoading: false,
    isLogged: false,
    error: false,
    ...sessionService.getSession()
}

export default function (state = initialState, action) {
    const response = action.results
    switch (action.type) {
        case LOGIN_START:
            return { ...state, isLoading: true }
        case LOGIN_FAILED:
            return { ...state, isLoading: false, msg: response.error, error: true }
        case LOGIN_SUCCESS:
            return { isLoading: false, isLogged: true, ...response }
        case LOGOUT:
            return { isLogged: false }
        default: return { ...state }
    }
}
