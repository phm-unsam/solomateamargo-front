import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
//css
import { useStyles, ColorButton } from './style'
import { Card, Typography, CardContent, CardActions } from '@material-ui/core';

const initialState = {
  departure: '',
  arrival: '',
  dateFrom: null,
  dateTo: null,
  seatNextoWindow: null,
  seatClass: ""
}

export const SearchComponent = (props) => {
  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState(new Date())
  const [dateTo, setDateTo] = useState(new Date())
  const [flightSearch, setFlightSearch] = useState({ initialState });

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
      })

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

  const changeSeat = (event, value) => {
    if (value) {
      setFlightSearch({
        ...flightSearch,
        seatClass: value.seatClass,
      })
    }
    else {
      clear()
    }
  }

  const searchSeat = () => {
    props.searchSeat(flightSearch);
  }

  const disabledButton = () => {
    return isEmpty(flightSearch.departure) && (flightSearch.dateTo === null) && (flightSearch.dateFrom === null) && isEmpty(flightSearch.arrival) && isEmpty(flightSearch.departure);
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
    setFlightSearch(initialState)
    props.clear(flightSearch);
  }

  const disabledButtonSeat = () => {
    return isEmpty(flightSearch.seatClass) && (flightSearch.seatNextoWindow === null)
  }
  return (
    <div>
      <div className={classes.cardWrapper}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Filtrar Vuelos
            </Typography>
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
            <br />
            <br />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker format="DD/MM/YYYY" name="dateFrom" value={dateFrom} onChange={changeDateFrom} className={classes.margin5} label="Desde"></KeyboardDatePicker>

              <KeyboardDatePicker format="DD/MM/YYYY" name="dateTo" value={dateTo} onChange={changeDateTo} className={classes.margin5} label="Hasta" disabled={flightSearch.dateFrom === null}></KeyboardDatePicker>
            </MuiPickersUtilsProvider>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={searchFlights}
              disabled={disabledButton()}
              size="small"
            >
              Filtrar vuelos
            </Button>
            <ColorButton
              variant="contained"
              size="small"
              className={classes.margin}
              onClick={clear}
            >
              Limpiar Campos
          </ColorButton>
          </CardActions>
        </Card>

        <Card className={classes.root}>
          <CardContent><div className={classes.cardContent}>
            <Typography variant="h5" component="h2">
              Filtrar Vuelos
            </Typography><br />
            <Autocomplete
              id="comboClass"
              name="seatClass"
              options={seatClasses}
              getOptionLabel={option => option.seatClass}
              onChange={(e, v) => changeSeat(e, v)}
              style={{ width: 220 }}
              className={classes.margin5}
              renderInput={params => <TextField {...params} label="Clase" variant="outlined" />}
            /><br />
            <Autocomplete
              id="comboClass"
              name="seatNextoWindow"
              options={seatWindow}
              getOptionLabel={option => option.typeSeat}
              onChange={(e, value) => updateInput(e, value)}
              style={{ width: 220 }}
              className={classes.margin5}
              renderInput={params => <TextField {...params} label="Ventanilla?" variant="outlined" />}
            /></div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={searchSeat}
              disabled={disabledButtonSeat()}
            >
              Buscar Asiento
            </Button>
            <ColorButton
              variant="contained"
              size="small"
              className={classes.margin}
              onClick={clear}
            >
              Limpiar Campos
          </ColorButton>
          </CardActions>
        </Card>
      </div>
    </div>
  )
}