import React, { useState, useEffect } from 'react';
import SnackbarOpen from '../snackbar/snackbar'
import { useSelector } from 'react-redux';
import FlightsService from '../../services/flightsService';

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
    try{

      setflights(await flightsService.getSearchFlight(searchFlights))
      //corregir nose si esta bien
      setSeats([])
    }
    catch(error){
      console.log(error)
    }
  }

  const getAllSeats = async (flightId) => {

    setFlightID(flightId)
    const seats = await flightsService.getAllSeats(flightId)
    convertBooleanToString(seats)

  }

  const searchSeat = async (flightSearch) => {
    try {
      const searchSeat = await flightsService.getSearchSeats(flightID, flightSearch)
      convertBooleanToString(searchSeat)
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response.data.error,
        severity: "error"
      })
    }
  }

  const convertBooleanToString = (seats) => {
    seats.forEach(seat => seat.nextoWindow = seat.nextoWindow ? "Si" : "No")
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
        message: "Se ha agregado con exito al carrito.",
        severity: "success"
      })
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response.data.error,
        severity: 'error'
      })
    }
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

      <SnackbarOpen open={snackbar.open} message={snackbar.message} severity={snackbar.severity} closeSnac={closeSnackbar}/>

    </div>
  )
}