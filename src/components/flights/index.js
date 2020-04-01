import React, { useState, Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import SnackbarOpen from '../../components/snackbar'

import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

//css
import { useStyles, ColorButton, StyledTableCell } from './Style'
import FlightsService from '../../services/flights';


export default Flights => {
  const flightsService = new FlightsService();
  let flightID = null
  const [seats, setSeats] = useState([])
  const [flights, setflights] = useState([])
  const [errorMessage, setErrorMessage] = useState()
  const [message, setMessage] = useState()
  const login = useSelector(store => store.login);
  useEffect(() => {
    const searchFlights = {
      dateFrom: new Date(),
      dateTo: new Date(),
      departure: '',
      arrival: ''
    }

    getFlight(searchFlights)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFlight = (searchFlights) => {
    flightsService.getFlight(searchFlights)
      .then(flight => {
        setflights(flight.data)
      }).catch(err =>
        console.log(err)
        )
  }

  const getAllSeats = flightId => {
    flightID =flightId 
    flightsService.getAllSeats(flightId)
      .then(seat => {
        setSeats(seat.data)
      }).catch(err => console.log(err))
  }

  const searchSeat = (seatWindow, seatClass) => {
    flightsService.getSearchSeats(flightID, seatWindow, seatClass)
      .then(seat => {
        setSeats(seat.data)
      }).catch(err => {
        setErrorMessage(err)
        setMessage('debe seleccionar un vuelo primero')
      }
      )
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
        setMessage('error no se pudo agregar al carrito el pasaje')
      }
      else {
        setErrorMessage(true)
        setMessage('se agrego el pasaje con exito al carrito')
        getAllSeats(flightID)
      }
    }
    )
  }

  const clear = (searchFlights) =>{
    
    getFlight(searchFlights)
  }

  return (
    <div>
      <SearchComponent searchSeat={searchSeat} getFlight={getFlight} clear={clear}></SearchComponent>
      <GridFlights getAllSeats={getAllSeats} flights={flights}></GridFlights>
      <GridSeats seats={seats} addCart={addCart}></GridSeats>

      <SnackbarOpen open={errorMessage} message={message} />

    </div>
  )
}

const SearchComponent = (props) => {
  const classes = useStyles();
  let seatNextoWindow = null
  let seatClass = ''

  const [flightSearch, setFlightSearch] = useState({
    departure: '',
    arrival: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    seatNextoWindow: null,
    seatClass: ''
  });

  const seatClasses = [
    { id: 0, typeName: 'Economy' }, { id: 1, typeName: 'Business' }, { id: 2, typeName: 'First' }
  ]

  const update = e => {

    setFlightSearch({
      ...flightSearch,
      [e.target.name]: e.target.value
    });
  }

  const updateInput = (e) => {
    debugger
    setFlightSearch({
      ...flightSearch,
      seatNextoWindow:  e.target.checked,
    })

    console.log(flightSearch)


    seatNextoWindow = e.target.checked
    props.searchSeat(seatNextoWindow, seatClass)
  }


  const changeDateFrom = date => {
    setFlightSearch({
      ...flightSearch,
      dateFrom: date
    });
  }

  const changeDateTo = date => {
    setFlightSearch({
      ...flightSearch,
      dateTo: date
    });

  }
  const seatsClass = (e, value) => {
    seatClass = value.typeName
    props.searchSeat(seatNextoWindow, seatClass)
  }
  const disabledButton = () => {
    return isEmpty(flightSearch.departure) && (flightSearch.dateTo._i === undefined) && isEmpty(flightSearch.arrival)
  }

  const isEmpty = (aField) => {
    return aField === "";
  }
  const searchFlights = () => {
    console.log(flightSearch)
    props.getFlight(flightSearch)
  }

  const clear = () => {
    setFlightSearch({
      departure: '',
      arrival: '',
      datefrom: new Date(),
      dateTo: new Date()
    })
    seatNextoWindow = null
    seatClass = null
    props.clear(flightSearch)
  }

  return (
    <Fragment>
      <Grid container spacing={3} className={classes.margin5}>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            margin="normal"
            name="departure"
            label="Origen"
            type="text"
            id="origin"
            value={flightSearch.departure}
            className={classes.margin5}
            onChange={update}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            margin="normal"
            name="destination"
            label="Destino"
            type="text"
            id="destination"
            value={flightSearch.destination}
            className={classes.margin5}
            onChange={update}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            id="comboClass"
            name="class"
            options={seatClasses}
            getOptionLabel={option => option.typeName}
            value={setFlightSearch.seatType}
            onChange={seatsClass}
            style={{ width: 220 }}
            className={classes.margin5}
            renderInput={params => <TextField {...params} label="Clase" variant="outlined"

            />

            }
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={searchFlights}
            disabled={disabledButton()}
          >
            Buscar
            </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid item xs={3}>
            <KeyboardDatePicker format="DD/MM/YYYY" name="dateFrom" value={flightSearch.dateFrom} onChange={changeDateFrom} className={classes.margin5} label="Desde"></KeyboardDatePicker>
          </Grid>
          <Grid item xs={3}>
            <KeyboardDatePicker format="DD/MM/YYYY" name="dateTo" value={flightSearch.dateTo} onChange={changeDateTo} className={classes.margin5} label="Hasta" disabled={(flightSearch.dateFrom._i === undefined)}></KeyboardDatePicker>
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={3}>
          <Typography variant="body1" className={classes.margin5} gutterBottom><input type="checkbox" name="window" value={setFlightSearch.window} className={classes.margin} onChange={updateInput} />Ventanilla </Typography>
        </Grid>
        <Grid item xs={3}>
          <ColorButton
            type="submit"
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={clear}
          >
            Limpiar Campos
            </ColorButton>
        </Grid>
      </Grid>
    </Fragment>
  )
}

const GridFlights = (props) => {
  const classes = useStyles();
  const { flights } = props

  return (
    <Fragment>

      <TableContainer className={classes.margin5}>
        <Table className={classes.table} spacing={3}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Origen</StyledTableCell>
              <StyledTableCell align="center">Destino</StyledTableCell>
              <StyledTableCell align="center">Aerolinea</StyledTableCell>
              <StyledTableCell align="center">Salida</StyledTableCell>
              <StyledTableCell align="center">Escala</StyledTableCell>
              <StyledTableCell align="center">Duracion</StyledTableCell>
              <StyledTableCell align="center">Desde</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.lenghts === 0 ? 'no hay vuelos disponibles' : flights.map(flight => (
              <TableRow key={flight.id} hover onClick={() =>  props.getAllSeats(flight.id)}>
                <TableCell align="center" component="th" scope="row">{flight.from}</TableCell>
                <TableCell align="center">{flight.to}</TableCell>
                <TableCell align="center">{flight.airlineName}</TableCell>
                <TableCell align="center">{flight.DepartureDate}</TableCell>
                <TableCell align="center">{flight.stopoversAmount}</TableCell>
                <TableCell align="center">{flight.flightDuration}</TableCell>
                <TableCell align="center">{"$" + flight.baseCost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

const GridSeats = (props) => {

  const classes = useStyles();
  let history = useHistory();
  let seatId = null

  const onPerfilClick = e => {
    history.push("/perfil");
  }


  const addCart = () => {
    props.addCart(seatId)
  }

  return (

    <Fragment>
      <TableContainer className={classes.margin5}>
        <Typography align='left' variant="h4" className={classes.margin5} gutterBottom>
          Selección de Asiento
        </Typography>
        <Table className={classes.table} spacing={3}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Clase</StyledTableCell>
              <StyledTableCell align="center">Numero</StyledTableCell>
              <StyledTableCell align="center">Ventanilla</StyledTableCell>
              <StyledTableCell align="center">Precio</StyledTableCell>
            </TableRow>
          </TableHead>
          {<TableBody>
            {(props.seats).map(seat => (
              <TableRow
                key={seat.number}
                hover
                onClick={() => seatId = (seat.number) }
              >
                <TableCell align="center" component="th" scope="row">
                  {seat.class}
                </TableCell>
                <TableCell align="center">{seat.number}</TableCell>
                <TableCell align="center">{seat.isNextToWindow ? "Si" : "No"}</TableCell>
                <TableCell align="center">{"$" + seat.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>}
        </Table>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.buttonAgregarCarrito}
          onClick={() => addCart()}
        //  disabled={seatId === null}
        >
          Agregar al carrito
          </Button>
      </TableContainer>
      <Grid container spacing={3} className={classes.margin5}>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom> Items en el carrito: 3 </Typography>
          <Typography variant="body1" gutterBottom> Total en el carrito: $150.000 </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.margin}

            onClick={onPerfilClick}
          >
            Perfil
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Finalizar Compra
          </Button>
        </Grid>
      </Grid>

    </Fragment>
  )
}