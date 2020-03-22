import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS } from '../../consts/'
const initialState = {
    userId: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_START:
            alert("despachado bro")
            return { ...state, isLoading: true }
        case LOGIN_FAILED:
            alert("despachado bro 2")
            return { ...state, isLoading: false }
        case LOGIN_SUCCESS:
            alert("despachado bro 2")
            return { ...state, isLoading: false }
        default: return { ...state }
    }
}
