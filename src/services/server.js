import  SessionSerivice from './sessionService'

export const ROOT_SERVER_URL = "http://localhost:16000/"

export const getUrlWithUser = () => {return `${ROOT_SERVER_URL}user/${SessionSerivice.getUserLoggedId()}`}