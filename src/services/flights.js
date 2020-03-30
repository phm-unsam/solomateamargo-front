import { apiCall } from '../redux/api/';


export default class FlightsService {

    getAllFlights() {

        try {
            return apiCall(`flights`, null, null, 'GET')
        } catch (error) {
            return error
        }
    }

    getSeats(userId, nextoWindow) {
        const url = `flight/${userId}/seats`
        try {
            if (nextoWindow === null) {
                return apiCall(url, null, null, 'GET')
            }

            else{
                return apiCall(url +`?nextoWindow=${nextoWindow}`, null, null, 'GET')
            }
        } catch (e) {
            return e
        }
    }


    postaddCart(payload) {
        const { flightId, seatNumber, id } = payload
        try {
            return apiCall(`user/${id}/cart/add?flightId=${flightId}&seatNumber=${seatNumber}`, null, null, 'POST')

        } catch (e) {
            return e
        }
    }

    getFlightSearchByDate(payload) {
        const { datefrom, dateTo, departure, arrival } = payload
        

        try {
            if (datefrom._i !== undefined || dateTo._i !== undefined) {
                return apiCall(`flights?dateFrom=${datefrom._i}&dateTo=${dateTo._i}`, null, null, 'GET')
            }
            else {
                return apiCall(`flights?departure=${departure}&arrival=${arrival}`, null, null, 'GET')
            }
        } catch (e) {
            return e
        }
    }
}