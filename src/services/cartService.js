import axios from 'axios'
import {ROOT_SERVER_URL} from './server'

export default class FlightsService {

    async cartLoad(userId) {
        return await axios.get(ROOT_SERVER_URL +`user/${userId}/cart`)
    }

    async deleteFlight(payload){
        return await axios.delete(ROOT_SERVER_URL + `user/${payload.loggedId}/cart/item/${payload.ticket.id}`,) 
    }

    async deleteAll(userId){
        return await axios.delete(ROOT_SERVER_URL + `user/${userId}/cart`)
    }

    async buyTicket(payload){
        return axios.post(ROOT_SERVER_URL + `user/${payload.loggedId}/cart/purchase`)
    }
}