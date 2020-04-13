import React, { useState } from 'react'
import { Card, Typography, CardContent, CardActions, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles, ColorButton } from './style';

const seatClasses = [
    { seatClass: 'Economy' }, { seatClass: 'Business' }, { seatClass: 'First' }
]
  
const seatWindow = [
    { typeSeat: 'Ventanilla', booleanSeat: true }, { typeSeat: 'Sin ventanilla', booleanSeat: false }
]

const initialState = {
    seatClass: null,
    nextToWindow: null
}

export default function FilterSeats(props) {
    const classes = useStyles();
    const disable = props.disable;
    const searchSeats = props.searchSeats;
    const clearGrids = props.clear;

    const [seatsFilters, setSeatsFilters] = useState(initialState)
    const [window, setWindow] = useState(null)

    const searchSeat = () => {
        searchSeats(seatsFilters);
    }

    const clear = () => {
        setSeatsFilters(initialState);
        setWindow(null);
        clearGrids();
    }

    return (
        <div>
            <Card className={classes.root}>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" component="h2">
                        Filtrar Asientos
                    </Typography><br />
                    <Autocomplete
                        id="comboClass"
                        name="seatClass"
                        value={seatsFilters.seatClass}
                        options={seatClasses}
                        disableClearable
                        getOptionLabel={option => option.seatClass ? option.seatClass : option}
                        onChange={(event, newValue) => {
                            setSeatsFilters({
                                ...seatsFilters,
                                seatClass: newValue.seatClass
                            });
                        }}
                        style={{ width: 220 }}
                        className={classes.margin5}
                        renderInput={params => <TextField {...params} label="Clase" variant="outlined" />}
                    /><br />
                    <Autocomplete
                        id="comboSeat"
                        name="seatNextoWindow"
                        value={window ? window : null}
                        disableClearable
                        options={seatWindow}
                        getOptionLabel={option => option.typeSeat ? option.typeSeat : option}
                        onChange={(event, newValue) => {
                            setSeatsFilters({
                                ...seatsFilters,
                                nextToWindow: newValue.booleanSeat
                            });
                            setWindow(newValue)
                        }}
                        style={{ width: 220 }}
                        className={classes.margin5}
                        renderInput={params => <TextField {...params} label="Ventanilla?" variant="outlined" autoComplete="false"/>}
                    />
                </div>
            </CardContent>
                <div className={classes.cardContent}>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={searchSeat}
                            disabled={disable()}
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
                </div>
            </Card>
        </div>    
    )
}