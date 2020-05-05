import React, { useState, useEffect } from 'react';
import SnackbarOpen from '../snackbar/snackbar'
import { useSelector } from 'react-redux';
import FlightsService from '../../services/flightsService';
import { useStyles } from './style'
import FilterFlights from './filterFlights'
//Components
import { GridFlights } from './gridFlights';
import { GridSeats } from './gridSeats';

export default Flights => {
  const classes = useStyles()
  const flightsService = new FlightsService();
  const [flightID, setFlightID] = useState(null);
  const [seats, setSeats] = useState([]);
  const [seat, setSeat] = useState()
  const [flights, setFlights] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const login = useSelector(store => store.login);

  useEffect(() => {
    getAllFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllFlights = async () => {
    setFlights(await flightsService.getAllFlights());
  }

  const searchFlight = async (searchFlights) => {
    setFlights(await flightsService.searchFlights(searchFlights));
    setSeats([]);
  }

  const getSeats = async (flight) => {
    setFlightID(flight.id);
    const seats = await flightsService.getSeats(flight.id);

    seats.forEach((seat) => {
      seat.cost += flight.baseCost;
    });

    convertBooleanToString(seats);
  }

  const convertBooleanToString = (seats) => {
    seats.forEach(seat => seat.nextoWindow = seat.nextoWindow ? "Si" : "No")
    setSeats(seats)
  }

  const addCart = async (seatId) => {
    const flight = {
      id: login.id,
      flightId: flightID,
      seatId: seatId
    }
    setSeats([])
    try {
      await flightsService.postaddCart(flight)
      getAllFlights()
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

  const clear = () => {
    getAllFlights()
    setSeats([]);
  }

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false
    });
  }

  return (
    <div>
      <div className={classes.column}>
        <FilterFlights searchFlight={searchFlight} clear={clear}></FilterFlights>
      </div>
      <div className={classes.contentWrapper}>
        <div className={classes.margin}>
          <GridFlights getSeats={getSeats} flights={flights}></GridFlights>
        </div>
        <div className={classes.margin}>
          <GridSeats seats={seats} addCart={addCart} seat={seat} setSeat={setSeat}></GridSeats>
        </div>
        <SnackbarOpen open={snackbar.open} message={snackbar.message} severity={snackbar.severity} closeSnac={closeSnackbar} />

      </div>
    </div>
  )
}
