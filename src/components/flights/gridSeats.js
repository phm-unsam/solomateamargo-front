import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

//css
import { useStyles } from './style'

import { useDispatch } from 'react-redux';
import { cartLoad } from '../../redux/actions/cartAction';
import TableCreator from '../tableCreator'
export const GridSeats = (props) => {
  const login = useSelector(store => store.login);
  const classes = useStyles();
  let history = useHistory();
  let seatId = null;
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

  const addCart = () => {
    props.addCart(seatId);
    updateFlights();
  }

  const total = () => {
    let sum = 0;
    cartFlights.forEach(cartFlight => sum = sum + cartFlight.cost);
    return sum;
  }

  const disabledAddCart = () => {
    return seatId !== null
  }

  const columnName = [
    { name: 'Clase' }, { name: 'Numero' }, { name: 'Ventanilla' }, { name: 'Precio' }
  ]

  const saveSeatId = (seat) => {
    seatId = (seat.number)
  }

  return (

    <Fragment>
    {/* <TableCell align="center">{seat.isNextToWindow ? "Si" : "No"}</TableCell> */}
    <TableCreator data={props.seats} columnName={columnName} bodyAction={saveSeatId} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.buttonAgregarCarrito}
        onClick={() => addCart()}
        disabled={disabledAddCart()}
      >
        Agregar al carrito
          </Button>

      <Grid container spacing={3} className={classes.margin5}>
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>Cantidad de items: {cartFlights.length}</Typography>
          <Typography variant="body1" gutterBottom>Total $ {total()}</Typography>
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
          >
            Finalizar Compra
            </Button>
        </Grid>
      </Grid>

    </Fragment>
  )
}