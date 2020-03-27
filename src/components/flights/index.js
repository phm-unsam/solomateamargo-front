import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import { yellow } from '@material-ui/core/colors';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { flightSearchLoad } from '../../redux/actions/FlightSearch';
import { loadSeat } from '../../redux/actions/FlightSearch'
//css
import { useStyles, ColorButton, StyledTableCell } from './Style'
const seatsTest = [
  {
    id: 'S1',
    typeName: 'Economy',
    number: 'A77',
    window: false,
    price: 30000
  },
  {
    id: 'S2',
    typeName: 'First',
    number: 'F54',
    window: false,
    price: 75000
  },
  {
    id: 'S3',
    typeName: 'Economy',
    number: 'B34',
    window: true,
    price: 63500
  },
  {
    id: 'S4',
    typeName: 'Economy',
    number: 'A12',
    window: true,
    price: 33000
  }
];

export default function Flights() {
  const [flights, setFlights] = useState(null);

  const handleFlightChange = event => {
    setFlights(event)
  }

  return (
    <div>
      {flights}
      <SearchComponent onFlightChange={handleFlightChange}></SearchComponent>
      <GridFlights></GridFlights>
      <GridSeats></GridSeats>
      <FooterFlights></FooterFlights>
    </div>
  )
}

function SearchComponent(props) {
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
    setFlightSearch({
      ...flightSearch,
      [e.target.name]: e.target.checked
    });
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

function GridFlights() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const flights = useSelector(state => state.FlightSearchReducer.flights)
  const seats = useSelector(state => state.FlightSearchReducer.seat)
  
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

function GridSeats() {
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
                <TableCell align="center">{seat.window ? "Si" : "No"}</TableCell>
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

function FooterFlights() {
  const classes = useStyles();

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