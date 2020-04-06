import React, { useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

//css
import { useStyles, ColorButton } from './style'

export const SearchComponent = (props) => {
  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState(new Date())
  const [dateTo, setDateTo] = useState(new Date())

  const [flightSearch, setFlightSearch] = useState({
    departure: '',
    arrival: '',
    dateFrom: null,
    dateTo: null,
    seatNextoWindow: null,
    loading: false,
    seatClass: ''
  });

  const seatClasses = [
    { seatClass: 'Economy' }, { seatClass: 'Business' }, { seatClass: 'First' }
  ]

  const seatWindow = [
    { typeSeat: 'ventanilla', booleanSeat: true }, { typeSeat: 'no ventanilla', booleanSeat: false }
  ]

  const update = e => {
    setFlightSearch({
      ...flightSearch,
      [e.target.name]: e.target.value
    });
  }


  const updateInput = (e, value) => {
    if (value) {
      setFlightSearch({
        ...flightSearch,
        seatNextoWindow: value.booleanSeat,
        loading: true
      })

      if (flightSearch.loading) {
        props.searchSeat(flightSearch);
        setFlightSearch({
          ...flightSearch,
          loading: false
        })
      }
    }
    else {
      clear()
    }
  }


  const changeDateFrom = date => {
    setDateFrom(date)
    setFlightSearch({
      ...flightSearch,
      dateFrom: date
    });
  }

  const changeDateTo = date => {
    setDateTo(date)
    setFlightSearch({
      ...flightSearch,
      dateTo: date
    });
  }

  const seatsClass = (e, value) => {
    if (value) {
      setFlightSearch({
        ...flightSearch,
        seatClass: value.seatClass ,
        loading: true
      })
      if (flightSearch.loading) {
        props.searchSeat(flightSearch);
        setFlightSearch({
          ...flightSearch,
          loading: false
        })
      }
    }
    else {
      clear()
    }
  }

  const disabledButton = () => {
    return isEmpty(flightSearch.departure) && (flightSearch.dateTo === null) && isEmpty(flightSearch.arrival) && isEmpty(flightSearch.departure);
  }

  const isEmpty = (aField) => {
    return aField === "";
  }

  const searchFlights = () => {
    setFlightSearch({
      ...flightSearch,
      dateFrom: dateFrom,
      dateTo: dateTo,
    });
    props.getSearchFlight(flightSearch);
  }

  const clear = () => {
    setFlightSearch({
      departure: '',
      arrival: '',
      dateFrom: null,
      dateTo: null,
      seatNextoWindow: null,
      loading: false,
      seatClass: ''
    })
    props.clear(flightSearch);
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
            name="arrival"
            label="Destino"
            type="text"
            id="destination"
            value={flightSearch.arrival}
            className={classes.margin5}
            onChange={update}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            id="comboClass"
            name="seatClass"
            options={seatClasses}
            getOptionLabel={option => option.seatClass}
            onChange={seatsClass}
            style={{ width: 220 }}
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
            <KeyboardDatePicker format="DD/MM/YYYY" name="dateTo" value={dateTo} onChange={changeDateTo} className={classes.margin5} label="Hasta" disabled={flightSearch.dateFrom === null}></KeyboardDatePicker>
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={3}>
          <Autocomplete
            id="comboClass"
            name="seatNextoWindow"
            options={seatWindow}
            getOptionLabel={option => option.typeSeat}
            onChange={(e, value) => updateInput(e, value)}
            style={{ width: 220 }}
            className={classes.margin5}
            renderInput={params => <TextField {...params} label="window" variant="outlined" />}
          />
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