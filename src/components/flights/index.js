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


import { useHistory } from "react-router-dom";
import { useSelector, useStore } from 'react-redux';

//css
import { useStyles, ColorButton, StyledTableCell } from './Style'
import FlightsService from '../../services/flights';


export default Flights => {
  const flightsService = new FlightsService();
  const [error, setError] = useState(null)
  const [flightID, setFlightID] = useState(null);
  const [seats, setSeats] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const [flights, setflights] = useState([])
  useEffect(() => {
    if (!isLoaded) {
      flightsService.getAllFlights()
        .then(flight => {
          setflights(flight)
          setIsLoaded(true);
        }).catch(err =>
          setError(err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectFlight = flightId => {
    setFlightID(flightId)
    flightsService.getSeats(flightId)
      .then(seat => {
        setSeats(seat)
      }).catch(err => setError(err))
    console.log(seats)
  }


  const filterWindow = checked => {
    const filterWindowss = (seats.data).filter(seat => seat.isNextToWindow)
    if (checked.target.checked) {
      setSeats(
        seats.data.filterWindowss,
      )
    }
    else {

    }
  }
  return (
    <div>
      <SearchComponent filterWindow={filterWindow} setflights={setflights}></SearchComponent>
      <GridFlights selectFlight={selectFlight} error={error} flights={flights}></GridFlights>
      <GridSeats seats={seats} flightID={flightID} error={error}></GridSeats>
    </div>
  )
}

const SearchComponent = (props) => {
  const classes = useStyles();
  const flightsService = new FlightsService();
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [flightSearch, setFlightSearch] = useState({
    origin: '',
    destination: '',
    class: null,
    window: false,
    dateFrom: null,
    dateTo: null
  });


  const seatClasses = [
    { typeName: 'Economy' }, { typeName: 'Business' }, { typeName: 'First' }
  ]


  const update = e => {

    setFlightSearch({
      ...flightSearch,
      [e.target.name]: e.target.value
    });
  }

  const updateInput = e => {
    props.filterWindow(e)

  }

  const changeDateFrom = date => {
    setDateFrom(date);
    setFlightSearch({
      ...flightSearch,
      dateFrom: date
    });
  }

  const changeDateTo = date => {
    setDateTo(date);
    setFlightSearch({
      ...flightSearch,
      dateTo: date
    });

  }

  const disabledButton = () => {
    return isEmpty(flightSearch.origin) && (dateTo._i === undefined) &&  isEmpty(flightSearch.destination)
  }

  const isEmpty = (aField) =>{
    return aField === "";
  }
  const searchFlights = e => {
    const filterDate = {
      datefrom: dateFrom,
      dateTo: dateTo,
      departure: flightSearch.origin,
      arrival: flightSearch.destination
    }
    flightsService.getFlightSearchByDate(filterDate).then(flight => (
      props.setflights(flight)
    ))

    // props.onFlightChange(flightSearch);
  }

  const clearData = e => {
    setDateFrom(new Date());
    setDateTo(new Date());
    setFlightSearch({
      origin: '',
      destination: '',
      class: null,
      window: false,
      dateFrom: new Date(),
      dateTo: new Date()
    })
  }



  return (
    <Fragment>
      <Grid container spacing={3} className={classes.margin5}>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            margin="normal"
            name="origin"
            label="Origen"
            type="text"
            id="origin"
            value={flightSearch.origin}
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
            style={{ width: 220 }}
            value={flightSearch.class}
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
            <KeyboardDatePicker format="DD/MM/YYYY" name="dateFrom" value={dateFrom} onChange={changeDateFrom} className={classes.margin5} label="Desde"></KeyboardDatePicker>
          </Grid>
          <Grid item xs={3}>
            <KeyboardDatePicker format="DD/MM/YYYY" name="dateTo" value={dateTo} onChange={changeDateTo} className={classes.margin5} label="Hasta" disabled={(dateFrom._i === undefined)}></KeyboardDatePicker>
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={3}>
          <Typography variant="body1" className={classes.margin5} gutterBottom><input type="checkbox" name="window" value={searchFlights.window} className={classes.margin} onChange={updateInput} />Ventanilla </Typography>
        </Grid>
        <Grid item xs={3}>
          <ColorButton
            type="submit"
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={clearData}
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

  const handleClick = flightId => {
    props.selectFlight(flightId)
  }
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
            {props.error ? <p>hubo un error</p> : null}
            {props.flights.length === 0 ? 'no hay vuelos disponibles' : props.flights.data.map(flight => (
              <TableRow key={flight.id}
                hover
                onClick={() => handleClick(flight.id)}
              >
                <TableCell align="center" component="th" scope="row">
                  {flight.from}
                </TableCell>
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
  const [error, setError] = useState(null)
  const classes = useStyles();
  const flightsService = new FlightsService();
  const login = useSelector(store => store.login);
  let history = useHistory();
  let seatId
  const onPerfilClick = e => {
    history.push("/perfil");
  }

  const addCart = () => {
    const flight = {
      id: login.id,
      flightId: props.flightID,
      seatNumber: seatId
    }
    flightsService.postaddCart(flight).then(flight => {
      if (flight.status !== 200) {
        setError(true)
      }
    }
    )
  }
  const handleClick = (seatID) => {
    seatId = seatID
  }

  const buttonCartDisabled = () =>{
    return seatId !== ''
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
          <TableBody>
            {(props.error) ? <p>hubo un error</p> : null}
            {(props.seats).length === 0 ? 'no hay vuelos disponibles' : (props.seats.data).map(seat => (
              <TableRow
                key={seat.number}
                hover
                onClick={() => handleClick(seat.number)
                }
              >
                <TableCell align="center" component="th" scope="row">
                  {seat.class}
                </TableCell>
                <TableCell align="center">{seat.number}</TableCell>
                <TableCell align="center">{seat.isNextToWindow ? "Si" : "No"}</TableCell>
                <TableCell align="center">{"$" + seat.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.buttonAgregarCarrito}
          onClick={() => addCart()}
          // disabled={buttonCartDisabled()}
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
      {error ? <p>no se pudo realizar la compra</p> : null}
    </Fragment>
  )
}