import React, { useState, useEffect } from 'react';
import SnackbarOpen from '../snackbar/snackbar'
import { useSelector } from 'react-redux';
import FlightsService from '../../services/flightsService';
import { useStyles } from './style'
import FilterFlights from './filterFlights'
import FilterSeats from './filterSeats'
//Components
import { GridFlights } from './gridFlights';
import { GridSeats } from './gridSeats';

export default Flights => {
  const classes = useStyles()
  const flightsService = new FlightsService();
  const [flightID, setFlightID] = useState(null);
  const [disableSearchSeat, setdisableSearchSeat] = useState(true);
  const [seats, setSeats] = useState([]);
  const [seat, setSeat] = useState()
  const [flights, setflights] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const login = useSelector(store => store.login);

  useEffect(() => {
    getAllFlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllFlight = async () => {
    setflights(await flightsService.getAllFlight());
  }

  const getSearchFlight = async (searchFlights) => {
    setflights(await flightsService.getSearchFlight(searchFlights));
    setSeats([]);
    setdisableSearchSeat(true)
  }

  const getAllSeats = async (flight) => {
    setdisableSearchSeat(false);
    setFlightID(flight.id);
    const seats = await flightsService.getAllSeats(flight.id);

    seats.forEach((seat) => {
      seat.cost += flight.baseCost;
    });

    convertBooleanToString(seats);

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
      seatId: seatId
    }
    setSeats([])
    try {
      await flightsService.postaddCart(flight)
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

  const clear = () => {
    getAllFlight()
    setSeats([]);
    setdisableSearchSeat(true)
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
      <FilterFlights getSearchFlight={getSearchFlight} clear={clear}></FilterFlights>
      <FilterSeats disable={disableSearchSeat} searchSeats={searchSeat} clear={clear}></FilterSeats></div>
      <div className={classes.contentWrapper}>
        <div className={classes.margin}>
          <GridFlights getAllSeats={getAllSeats} flights={flights}></GridFlights>
        </div>
        <div className={classes.margin}>
          <GridSeats seats={seats} addCart={addCart} seat={seat} setSeat={setSeat}></GridSeats>
        </div>
        <SnackbarOpen open={snackbar.open} message={snackbar.message} severity={snackbar.severity} closeSnac={closeSnackbar} />

      </div>
    </div>
  )
}
