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


//redux
import { useDispatch } from 'react-redux';
import { flightSearchLoad, filteredWindowSeats } from '../../redux/actions/FlightSearch';
import { loadSeat } from '../../redux/actions/FlightSearch'
//css
import { useStyles, ColorButton, StyledTableCell } from './Style'


export default Flights => {
  const [flights, setFlights] = useState(null);

  const handleFlightChange = event => {
    setFlights(event)
  }

  return (
    <div>
      <SearchComponent onFlightChange={handleFlightChange}></SearchComponent>
      <GridFlights></GridFlights>
      <GridSeats></GridSeats>
      <FooterFlights></FooterFlights>
    </div>
  )
}

const SearchComponent = (props) => {
  const dispatch = useDispatch();
  const seats = useSelector(state => state.FlightSearchReducer.seat)
  const flightId = useSelector(state => state.FlightSearchReducer.selectedFlight)
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


  const classes = useStyles();
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
    if (e.target.checked) {
      dispatch(filteredWindowSeats(seats))
    }
    else {
       dispatch(loadSeat(flightId))

    }
    
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

  const searchFlights = e => {
    debugger;
    props.onFlightChange(flightSearch);
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
            renderInput={params => <TextField {...params} label="Clase" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={searchFlights}
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
            <KeyboardDatePicker format="DD/MM/YYYY" name="dateTo" value={dateTo} onChange={changeDateTo} className={classes.margin5} label="Hasta"></KeyboardDatePicker>
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

const GridFlights = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const flights = useSelector(state => state.FlightSearchReducer.flights)

  useEffect(() => {
    dispatch(flightSearchLoad())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = flightId => {
    dispatch(loadSeat(flightId))
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
            {Array.from(flights).map(flight => (
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

const GridSeats = () => {
  const classes = useStyles();
  const seats = useSelector(state => state.FlightSearchReducer.seat)

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
            {seats.map(seat => (
              <TableRow
                key={seat.number}
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
        >
          Agregar al carrito
          </Button>
      </TableContainer>
    </Fragment>
  )
}

const FooterFlights = () => {
  const classes = useStyles();
  let history = useHistory();

  const onPerfilClick = e => {
    history.push("/perfil");
  }

  return (
    <Fragment>
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