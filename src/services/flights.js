import { apiCall } from '../redux/api/';


export default class FlightsService {

    getSearchSeats(userId, seatNextoWindow, seatType) {
        // const {seatNextoWindow} = flightSearch
        console.log(seatType)
        const url = `flight/${userId}/seats`
        try {
            if(seatNextoWindow === null){
                return apiCall(url + `?seatType=${seatType}`, null, null, 'GET')
            }
            else if (seatType === ''){
                return apiCall(url + `?nextoWindow=${seatNextoWindow}`, null, null, 'GET')
            }
            else{
                return apiCall(url + `?nextoWindow=${seatNextoWindow}?seatType=${seatType}?nextoWindow=${seatNextoWindow}`, null, null, 'GET')
            }

        } catch (e) {
            return e
        }
    }


    getAllSeats(userId) {
        const url = `flight/${userId}/seats`
        try {
            return apiCall(url, null, null, 'GET')


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

    getSearchFlight(filterFlights) {

        const { dateFrom, dateTo, departure, arrival } = filterFlights

        try {
            if (dateFrom._i !== undefined || dateTo._i !== undefined) {
                return apiCall(`flights?dateFrom=${dateFrom._i}&dateTo=${dateTo._i}`, null, null, 'GET')
            }
            else {
                return apiCall(`flights?departure=${departure}&arrival=${arrival}`, null, null, 'GET')
            }
        } catch (e) {
            return e
        }
    }

    getAllFlight(){
        try {
            return apiCall(`flights`, null, null, 'GET')
        
        } catch (e) {
            return e
        }
    }
}