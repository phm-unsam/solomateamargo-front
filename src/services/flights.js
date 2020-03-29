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
            const result =apiCall(`user/${id}/cart/add?flightId=${flightId}&seatNumber=${seatNumber}`,null, null, 'POST')
            console.log(result)
            return result
        } catch (e) {
            return e
        }
    }
}