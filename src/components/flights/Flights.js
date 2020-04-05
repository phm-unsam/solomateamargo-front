import React, { useState, useEffect } from 'react';
import SnackbarOpen from '../snackbar/Snackbar'
import { useSelector } from 'react-redux';
import FlightsService from '../../services/flights';

//Components
import { SearchComponent } from './searchComponent';
import { GridFlights } from './gridFlights';
import { GridSeats } from './gridSeats';

export default Flights => {
  const flightsService = new FlightsService();
  const [flightID, setFlightID] = useState(null)
  const [seats, setSeats] = useState([])
  const [flights, setflights] = useState([])
  const [errorMessage, setErrorMessage] = useState()
  const [message, setMessage] = useState()
  const login = useSelector(store => store.login);


  useEffect(() => {
    getAllFlight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllFlight = async () => {
    setflights(await flightsService.getAllFlight())
  }

  const getSearchFlight = async (searchFlights) => {
    setflights(await flightsService.getSearchFlight(searchFlights))
  }

  const getAllSeats = async (flightId) => {
    setFlightID(flightId)
    const seats = await flightsService.getAllSeats(flightId)
    convertBooleanToString(seats)

  }

  const searchSeat = async (flightSearch, seatClass) => {
    const searchSeat = await flightsService.getSearchSeats(flightID, flightSearch, seatClass)
    convertBooleanToString(searchSeat)
 
    //     setErrorMessage(err)
    //     setMessage('Debe seleccionar un vuelo primero.')

  }

  const convertBooleanToString = (seats) => {
    seats.forEach(seat => seat.isNextToWindow = seat.isNextToWindow ? "Si" : "No")
    setSeats(seats)
  }


  const addCart = async (seatId) => {
    const flight = {
      id: login.id,
      flightId: flightID,
      seatNumber: seatId
    }
    
    flightsService.postaddCart(flight)
    getAllSeats(flightID)
    getAllFlight()
  }

  const clear = (searchFlights) => {
    getAllFlight(searchFlights)
    
  }

  const clearSeat = () => {
    getAllSeats(flightID)
  }
  return (
    <div>
      <SearchComponent searchSeat={searchSeat} getSearchFlight={getSearchFlight} clear={clear} clearSeat={clearSeat}></SearchComponent>
      <GridFlights getAllSeats={getAllSeats} flights={flights}></GridFlights>
      <GridSeats seats={seats} addCart={addCart}></GridSeats>

      <SnackbarOpen open={errorMessage} message={message} />

    </div>
  )
}