import {
    FLIGHT_SEARCH_LOAD,
    FLIGHT_SEARCH_LOAD_ERROR,
    FLIGHT_SEARCH_LOAD_FINISHED
} from '../../consts'

const initialState = {
    flights: [],
    error: null,
    loading: false,
}

export default function (state = initialState, action) {
    switch (action.type) {

        case FLIGHT_SEARCH_LOAD:
            return {
                ...state,
                loading: action.payload
            }
        case FLIGHT_SEARCH_LOAD_FINISHED:
            return {
                ...state,
                error: false,
                loading: null,
                flights: action.results.data,
            }

        case FLIGHT_SEARCH_LOAD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}