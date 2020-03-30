import { apiCall } from '../redux/api/';


export default class FlightsService {

    getAllFlights() {

        try {
            return apiCall(`flights`, null, null, 'GET')
        } catch (error) {
            return error
        }
    }

    loadSeats(userId) {
        try {
            return apiCall(`flight/${userId}/seats`, null, null, 'GET')
        } catch (e) {
            return e
        }
    }


    addCart(payload) {
        const { flightId, seatNumber, id } = payload
        try {
            return apiCall(`user/${id}/cart/add?flightId=${flightId}&seatNumber=${seatNumber}`, null, null, 'POST')

        } catch (e) {
            return e
        }
    }

    flightSearchByDate(payload) {
        const { datefrom, dateTo, departure,arrival } = payload
        let results
        try {
            if (datefrom._i !== undefined || dateTo._i !== undefined) {
                results = apiCall(`flights?dateFrom=${datefrom._i}&dateTo=${dateTo._i}&arrival=${departure}`, null, null, 'GET')
            }
            else {
                console.log(departure)
                results = apiCall(`flights?departure=${departure}&arrival=${arrival}`, null, null, 'GET')
            }
            return results
        } catch (e) {
            return e
        }
    }
}