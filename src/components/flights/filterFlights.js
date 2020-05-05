import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Card, Typography, CardContent, CardActions } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
//css
import { useStyles, ColorButton } from './style'

const initialState = {
    departure: "",
    arrival: "",
    dateFrom: moment(),
    dateTo: moment(),
    seatClass: null,
    nextToWindow: null
}

const seatClasses = [
    { seatClass: 'Economy' }, { seatClass: 'Business' }, { seatClass: 'First' }
]

const seatWindow = [
    { typeSeat: 'Ventanilla', booleanSeat: true }, { typeSeat: 'Pasillo', booleanSeat: false }
]

const FilterFlights = (props) => {
    const classes = useStyles();
    const [flightFilters, setFlightFilters] = useState(initialState)
    const [window, setWindow] = useState(null)

    const update = (event) => {
        const { name, value } = event.target
        setFlightFilters({
            ...flightFilters,
            [name]: value
        });
    }

    const updateDateFrom = (date) => {
        setFlightFilters({
            ...flightFilters,
            dateFrom: moment(date)
        })
    }

    const updateDateTo = (date) => {
        setFlightFilters({
            ...flightFilters,
            dateTo: moment(date)
        })
    }

    const resetSearch = () => {
        setFlightFilters(initialState)
        setWindow(null);
        props.clear()
    }

    const isDateToDisabled = () => {
        return flightFilters.dateFrom === ""
    }

    const filterFlights = () => {
        props.searchFlight(flightFilters)
    }

    const isSearchDisabled = () => {
        return isDateToDisabled() &&  flightFilters.departure === "" && flightFilters.arrival === ""
    }
    
    return (
        <Card>
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
                value={flightFilters.departure}
                className={classes.marginShort}
                onChange={update}
            />
            <TextField
                variant="outlined"
                margin="normal"
                name="arrival"
                label="Destino"
                type="text"
                id="destination"
                value={flightFilters.arrival}
                className={classes.marginShort}
                onChange={update}
            />
            <br />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    format="DD/MM/YYYY"
                    name="dateFrom"
                    onChange={updateDateFrom}
                    className={classes.marginShort}
                    value={flightFilters.dateFrom}
                    label="Desde">
                </KeyboardDatePicker>
                <KeyboardDatePicker
                    format="DD/MM/YYYY"
                    name="dateTo"
                    onChange={updateDateTo}
                    disabled={isDateToDisabled()}
                    className={classes.marginShort}
                    value={flightFilters.dateTo}
                    label="Hasta" >
                </KeyboardDatePicker>
            </MuiPickersUtilsProvider>
            {isDateToDisabled() ? "Seleccione un rango para activar el filtrado por fechas" : ""}
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Autocomplete
                        name="seatClass"
                        value={flightFilters.seatClass}
                        options={seatClasses}
                        disableClearable
                        getOptionLabel={option => option.seatClass ? option.seatClass : option}
                        onChange={(event, newValue) => {
                            setFlightFilters({
                                ...flightFilters,
                                seatClass: newValue.seatClass
                            });
                        }}
                        style={{ width: 220 }}
                        renderInput={params => <TextField {...params} label="Clase" variant="outlined" />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        name="seatNextoWindow"
                        value={window ? window : null}
                        disableClearable
                        options={seatWindow}
                        getOptionLabel={option => option.typeSeat ? option.typeSeat : option}
                        onChange={(event, newValue) => {
                            setFlightFilters({
                                ...flightFilters,
                                nextToWindow: newValue.booleanSeat
                            });
                            setWindow(newValue)
                        }}
                        style={{ width: 220 }}
                        renderInput={params => <TextField {...params} label="Ventanilla?" variant="outlined" autoComplete="false" />}
                    />
                </Grid>
            </Grid>
            </CardContent>
            <div className={classes.cardContent}>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={filterFlights}
                        size="small"
                        disabled={isSearchDisabled()}
                    >
                        Filtrar vuelos
                    </Button>
                    <ColorButton
                        variant="contained"
                        size="small"
                        className={classes.margin}
                        onClick={resetSearch}
                    >
                        Limpiar Campos
                    </ColorButton>
                </CardActions>  
            </div>
        </Card>
    )
}
export default FilterFlights