import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

//css
import { useStyles } from './style';

import { useDispatch } from 'react-redux';
import { cartLoad } from '../../redux/actions/cartAction';
import TableCreator from '../tableCreator/tableCreator';

export const GridSeats = (props) => {
  const login = useSelector(store => store.login);
  const classes = useStyles();
  let history = useHistory();
  const cartFlights = useSelector(state => state.cartReducer.flights);
  const dispatch = useDispatch();
  useEffect(() => {
    updateFlights()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateFlights = () => {
    dispatch(cartLoad(login.id));
  }

  const onPerfilClick = e => {
    history.push("/perfil");
  }

  const onCartClick = e => {
    history.push("/cart");
  }

  const addCart = (seat) => {
    props.addCart(seat.number);
    updateFlights();
  }

 

  const columnName = [
    {name: 'Ventanilla' }, {name: 'Precio' }, {name: 'Numero' }, {name: 'Clase' }, { name: 'Accion' }
  ]

  
  const desabledCart = () =>{
    return cartFlights.length === 0
  }

  return (

    <Fragment>
      <TableCreator data={props.seats} columnName={columnName} buttonAction={addCart} titleButton="agregar Al carrito"/> 
    
      <Grid container spacing={3} className={classes.margin5}>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>Cantidad de items: {cartFlights.numberOfTickets}</Typography>
          <Typography variant="body1" gutterBottom>Total ${cartFlights.totalCost}</Typography>
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
            onClick={onCartClick}
            disabled={desabledCart()}
          >
            Finalizar Compra
            </Button>
        </Grid>
      </Grid>

    </Fragment>
  )
}