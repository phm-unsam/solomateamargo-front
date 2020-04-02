import React, { useState, useEffect } from 'react';
import SnackbarOpen from '../../components/snackbar'
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

  const getAllFlight = () => {
    flightsService.getAllFlight()
      .then(flight => {
        setflights(flight.data)
      }).catch(err =>
        console.log(err)
      )
  }

  const getSearchFlight = (searchFlights) => {
    flightsService.getSearchFlight(searchFlights)
      .then(flight => {
        setflights(flight.data)
      }).catch(err =>
        console.log(err)
      )
  }


  const getAllSeats = flightId => {
    setFlightID(flightId)
    flightsService.getAllSeats(flightId)
      .then(seat => {
        setSeats(seat.data)
      }).catch(err => {
        setErrorMessage(err)
        setMessage('No hay asientos disponibles para este vuelo.')
      })
  }

  const searchSeat = (seatWindow, seatClass) => {
    flightsService.getSearchSeats(flightID, seatWindow, seatClass)
      .then(seat => {
        setSeats(seat.data)
      }).catch(err => {
        setErrorMessage(err)
        setMessage('Debe seleccionar un vuelo primero.')
      })
  }

  const addCart = (seatId) => {
    const flight = {
      id: login.id,
      flightId: flightID,
      seatNumber: seatId
    }
    flightsService.postaddCart(flight).then(flight => {
      if (flight.status !== 200) {
        setErrorMessage(true)
        setMessage('Error no se pudo agregar al carrito el pasaje.')
      }
      else {
        setErrorMessage(true)
        setMessage('Se agrego el pasaje con exito al carrito.')
        getAllSeats(flightID)
      }
    })
  }

  const clear = (searchFlights) => {
    getAllFlight(searchFlights)
  }

  return (
    <div>
      <SearchComponent searchSeat={searchSeat} getSearchFlight={getSearchFlight} clear={clear}></SearchComponent>
      <GridFlights getAllSeats={getAllSeats} flights={flights}></GridFlights>
      <GridSeats seats={seats} addCart={addCart}></GridSeats>

      <SnackbarOpen open={errorMessage} message={message} />

    </div>
  )
}