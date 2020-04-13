import axios from 'axios'
import { REST_SERVER_URL } from './server'

export default class FlightsService {

    async getSearchSeats(userId, seatSearch) {
        const { nextToWindow, seatClass } = seatSearch


        const result = await axios.get(`${REST_SERVER_URL}flight/${userId}/seats`, {
            params: {
                seatType: seatClass,
                nextToWindow: nextToWindow
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

    async getSearchFlight(flightFilters) {
        const { dateFrom, dateTo, departure, arrival } = flightFilters;

        const result = await axios.get(`${REST_SERVER_URL}flights`, {
            params: {
                dateFrom: dateFrom,
                dateTo: dateTo,
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

}