import axios from 'axios'
import { ROOT_SERVER_URL } from './server'

export default class FlightsService {

    async getAllFlights() {
        const result = await axios.get(ROOT_SERVER_URL + `flights`)
        return result.data

    }

    async getSeats(userId) {
        const result = await axios.get(ROOT_SERVER_URL + `flight/${userId}/seats`)
        return result.data
    }

    async postaddCart(payload) {
        const { flightId, seatId, id } = payload
        const result = await axios.post(ROOT_SERVER_URL + `user/${id}/cart/item`, { flightId, seatId })
        return result

    }

    async searchFlights(flightFilters) {
        const { dateFrom, dateTo, departure, arrival, nextToWindow, seatClass } = flightFilters;

        const result = await axios.get(`${ROOT_SERVER_URL}flights`, {
            params: {
                dateFrom: dateFrom.format("DD/MM/YYYY"),
                dateTo: dateTo.format("DD/MM/YYYY"),
                departure: departure,
                arrival: arrival,
                seatType: seatClass,
                nextoWindow: nextToWindow
            }
        });

        return result.data;

    }
    

}