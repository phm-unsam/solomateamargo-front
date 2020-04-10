import { LOGIN_START,LOGOUT } from "../../consts"

export const loginUser = (payload) => ({
    type : LOGIN_START,
    payload
})

export const logoutUser = (payload) => ({
    type : LOGOUT,
    payload
})
