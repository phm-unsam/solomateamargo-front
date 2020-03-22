import { LOGIN_START } from "../../consts"

export const loginUser = (payload)=>({
    type : LOGIN_START,
    payload
})