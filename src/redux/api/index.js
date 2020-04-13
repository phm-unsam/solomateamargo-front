import axios from 'axios'

const B_URL = 'http://localhost:16000/'

export const apiCall = ( url, data, headers, method) => axios ({
    method,
    url: B_URL+ url,
    data,
    headers
})