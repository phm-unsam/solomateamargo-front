import { apiCall } from '../redux/api/';
import moment from 'moment';

export default class FlightsService {

    getSearchSeats(userId, flightSearch, seatType) {
        const {seatNextoWindow} = flightSearch
        
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
            const seats = apiCall(url, null, null, 'GET')
            return seats

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
            if (dateTo !== null) {
                return apiCall(`flights?dateFrom=${this.formatDate(dateFrom)}&dateTo=${this.formatDate(dateTo)}&departure=${departure}&arrival=${arrival}`, null, null, 'GET')
            }
            else {
                console.log("qsdas")
                return apiCall(`flights?departure=${departure}&arrival=${arrival}`, null, null, 'GET')
            }
        } catch (e) {
            return e
        }
    }

    formatDate(date) {
       return  moment(date).format("DD/MM/YYYY") 
    }

    getAllFlight(){
        try {
            return apiCall(`flights`, null, null, 'GET')
        
        } catch (e) {
            return e
        }
    }
}