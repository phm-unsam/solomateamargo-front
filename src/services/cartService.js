import axios from 'axios'
export const REST_SERVER_URL = 'http://localhost:16000/'

export default class FlightsService {

    async cartLoad(userId) {
        return await axios.get(REST_SERVER_URL +`user/${userId}/cart`)
    }

    async deleteFlight(payload){
        return await axios.delete(REST_SERVER_URL + `user/${payload.loggedId}/cart/item/${payload.ticket.id}`,) 
    }

    async deleteAll(userId){
        return await axios.delete(REST_SERVER_URL + `user/${userId}/cart`)
    }

    async buyTicket(payload){
        return axios.post(REST_SERVER_URL + `user/${payload.loggedId}/cart/purchase`)
    }
}