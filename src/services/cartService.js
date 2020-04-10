import axios from 'axios'
export const REST_SERVER_URL = 'http://localhost:16000/'

export default class FlightsService {

    async cartLoad(userId) {
        return await axios.get(REST_SERVER_URL +`user/${userId}/cart`)
    }

    async deleteFlight(flight, userId){
        
        return await axios.delete(REST_SERVER_URL + `user/${userId}/cart/item/${flight.id}`,) 
    }

    async deleteAll(userId){
        return await axios.delete(REST_SERVER_URL + `user/${userId}/cart`)
    }

    async buyTicket(userId){
        return axios.post(REST_SERVER_URL + `user/${userId}/cart/purchase`)
    }
}