import React, { useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

//css
import { useStyles, ColorButton } from './Style'

export const SearchComponent = (props) => {
    const classes = useStyles();
    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())
    let seatNextoWindow = null;
    let seatClass = '';
  
    const [flightSearch, setFlightSearch] = useState({
      departure: '',
      arrival: '',
      dateFrom: null,
      dateTo: null,
      seatNextoWindow: null
    });
  
    const seatClasses = [
      { seatClass: 'Economy' }, { seatClass: 'Business' }, { seatClass: 'First' }
    ]
  
    const update = e => {
      setFlightSearch({
        ...flightSearch,
        [e.target.name]: e.target.value
      });
    }
  
    
    const updateInput = (e) => {
      setFlightSearch({...flightSearch, seatNextoWindow : !seatNextoWindow })
      
      console.log(flightSearch)
      seatNextoWindow = e.target.checked;
      props.searchSeat(seatNextoWindow, seatClass);
    }
  
  
    const changeDateFrom = date => {
      setDateFrom(date)
      setFlightSearch({
        ...flightSearch,
        dateFrom: date
      });
      console.log(flightSearch)
    }
  
    const changeDateTo = date => {
      setDateTo(date)
      setFlightSearch({
        ...flightSearch,
        dateTo: date
      });
      console.log(flightSearch)
    }
  
    const seatsClass = (e, value) => {
      if(value){
        seatClass = value.seatClass;
        props.searchSeat(seatNextoWindow, seatClass);
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
      })
      
      seatNextoWindow = null;
      seatClass = null;
      console.log(seatClass)
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
              onChange={(e, value) => seatsClass(e, value)}
              style={{ width: 220 }}
              className={classes.margin5}
              renderInput={params => <TextField {...params} label="Clase" variant="outlined"/>}
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
            <Typography variant="body1" className={classes.margin5} gutterBottom><input type="checkbox" name="seatNextoWindow" className={classes.margin} onChange={(e) => updateInput(e)} />Ventanilla </Typography>
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