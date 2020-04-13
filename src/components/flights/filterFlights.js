import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Card, Typography, CardContent, CardActions } from '@material-ui/core';
//css
import { useStyles, ColorButton } from './style'
const initialState = {
    departure: "",
    arrival: "",
    dateFrom: "",
    dateTo: "",
}
const FilterFlights = (props) => {
    const classes = useStyles();
    const [flightFilters, setFlightFilters] = useState(initialState)

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
            dateFrom: moment(date).format("DD/MM/YYYY")
        })
    }

    const updateDateTo = (date) => {
        setFlightFilters({
            ...flightFilters,
            dateTo: moment(date).format("DD/MM/YYYY")
        })
    }

    const resetSearch = () => {
        setFlightFilters(initialState)
        props.clear()
    }

    const isDateToDisabled = () => {
        return flightFilters.dateFrom === ""
    }

    const filterFlights = () => {
        props.getSearchFlight(flightFilters)
    }

    const isSearchDisabled = () => {
        return isDateToDisabled &&  flightFilters.departure === "" && flightFilters.arrival === ""
    }

    return (
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
                <br />
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        format="DD/MM/YYYY"
                        name="dateFrom"
                        onChange={updateDateFrom}
                        className={classes.marginShort}
                        label="Desde"></KeyboardDatePicker>
                    <KeyboardDatePicker
                        format="DD/MM/YYYY"
                        name="dateTo"
                        onChange={updateDateTo}
                        disabled={isDateToDisabled()}
                        className={classes.marginShort}
                        label="Hasta" >
                    </KeyboardDatePicker>
                </MuiPickersUtilsProvider><br />
                {isDateToDisabled() ? "Seleccione un rango para activar el filtrado por fechas" : ""}
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