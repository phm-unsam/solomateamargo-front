import moment from 'moment';
import axios from 'axios'
export const REST_SERVER_URL = 'http://localhost:16000/'

export default class FlightsService {

    async getSearchSeats(userId, flightSearch) {
        const {seatNextoWindow, seatClass} = flightSearch
        const url = REST_SERVER_URL + `flight/${userId}/seats`
            if(seatNextoWindow === null){
                const result = await axios.get(url + `?seatType=${seatClass}`)
                return result.data
            }
            else{
                const result = await axios.get(url + `?seatType=${seatClass}&nextoWindow=${seatNextoWindow}`)
                return result.data
            }
    }

    async getAllSeats(userId) {
            const result = await axios.get(REST_SERVER_URL +  `flight/${userId}/seats`)
            return result.data
    }
    async postaddCart(payload) {
        const { flightId, seatNumber, id } = payload
            const result = await axios.post(REST_SERVER_URL +  `user/${id}/cart/add?flightId=${flightId}&seatNumber=${seatNumber}`)
            return result

    }

    async getSearchFlight(filterFlights) {
        const { dateFrom, dateTo, departure, arrival } = filterFlights
        try {
            if (dateTo !== null) {
                const result = await axios.get(REST_SERVER_URL + `flights?dateFrom=${this.formatDate(dateFrom)}&dateTo=${this.formatDate(dateTo)}&departure=${departure}&arrival=${arrival}`)
                return result.data
            }
            else {
                const result = await axios.get(REST_SERVER_URL + `flights?departure=${departure}&arrival=${arrival}`)
                return result.data
            }
        } catch (e) {
            return e
        }
    }

    formatDate(date) {
       return  moment(date).format("DD/MM/YYYY") 
    }

    async getAllFlight(){
        try {
            const result = await axios.get(REST_SERVER_URL + `flights`)
            return result.data
        } catch (e) {
            return e
        }
    }
}