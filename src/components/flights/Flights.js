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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  })
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
    //corregir nose si esta bien
    setSeats([])
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
    
    try {
       await flightsService.postaddCart(flight)
      getAllSeats(flightID)
      getAllFlight()
      setSnackbar({
        open: true,
        message: "se agregado con exito al carrito",
      })
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response.data.error,
      })
    }
    console.log(snackbar)
    debugger
  }

  const clear = (searchFlights) => {
    getAllFlight(searchFlights)
    getAllSeats(flightID)
  }
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false});
  }

  return (
    <div>
      <SearchComponent searchSeat={searchSeat} getSearchFlight={getSearchFlight} clear={clear}></SearchComponent>
      <GridFlights getAllSeats={getAllSeats} flights={flights}></GridFlights>
      <GridSeats seats={seats} addCart={addCart}></GridSeats>

      <SnackbarOpen open={snackbar.open} message={snackbar.message} severity="success" closeSnac={closeSnackbar}/>

    </div>
  )
}