import { apiCall } from '../redux/api/';


export default class FlightsService {

    getAllFlights() {

        try {
            return  apiCall(`flights`, null, null, 'GET')
        } catch (error) {
            return error
        }
    }

    loadSeats(userId) {
        try {
           return  apiCall(`flight/${userId}/seats`, null, null, 'GET')
        } catch (e) {
           return e
        }
    }


     addCart(payload) {
        const {flightId, seatNumber, id} = payload
        console.log(payload)
        try {
            return apiCall(`user/${id}/cart/add?flightId=${flightId}&seatNumber=${seatNumber}`,null, null, 'POST')
         
        } catch (e) {
            return e
        }
    }

    flightSearchByDate(payload) {
        const {datefrom, dateTo} = payload 
        console.log(payload.datefrom)
        try {
            const results = apiCall(`flights?dateFrom=${datefrom._i}&dateTo=${dateTo._i}`, null, null, 'GET')
                return results
            } catch (e) {
                return e
            }
        }
}