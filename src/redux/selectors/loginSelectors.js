import { get } from 'lodash'

export const isLoginLoading = (state) => get(state, 'login.isLoading')
export const loginHasError = (state) => get(state, 'login.error')
export const loginErrorMsg = (state) => get(state, 'login.msg')