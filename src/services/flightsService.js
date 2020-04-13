import moment from 'moment';
import axios from 'axios'
import {REST_SERVER_URL} from './server'

export default class FlightsService {

    async getSearchSeats(userId, flightSearch) {
        const { seatNextoWindow, seatClass } = flightSearch
        
        
        const result = await axios.get(`${REST_SERVER_URL}flight/${userId}/seats`, {
            params: {
                seatType: seatClass,
                nextoWindow: seatNextoWindow
            }
        });

        return result.data;
        
    }

    async getAllSeats(userId) {
        const result = await axios.get(REST_SERVER_URL + `flight/${userId}/seats`)
        return result.data
    }
    
    async postaddCart(payload) {
        const { flightId, seatNumber, id } = payload
        const result = await axios.post(REST_SERVER_URL + `user/${id}/cart/item`, { flightId, seatNumber })
        return result

    }

    async getSearchFlight(filterFlights) {
        const { dateFrom, dateTo, departure, arrival } = filterFlights;

        const result = await axios.get(`${REST_SERVER_URL}flights`, {
            params: {
                dateFrom: this.formatDate(dateFrom),
                dateTo: this.formatDate(dateTo),
                departure: departure,
                arrival: arrival
            }
        });

        return result.data;

    }
    async getAllFlight() {
        const result = await axios.get(REST_SERVER_URL + `flights`)
        return result.data

    }

    formatDate(date) {
        return moment(date).format("DD/MM/YYYY")
    }

}