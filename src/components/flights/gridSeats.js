import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table'

import Typography from '@material-ui/core/Typography';
import { NoDataCard } from '../noDataCard';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

//css
import { useStyles } from './style';

import { useDispatch } from 'react-redux';
import { cartLoad } from '../../redux/actions/cartAction';

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
    dispatch(cartLoad({loggedId:login.id}));
  }

  const onPerfilClick = e => {
    history.push("/perfil");
  }

  const onCartClick = e => {
    history.push("/cart");
  }

  const addCart = (e, seat) => {
    props.addCart(seat.number);
    updateFlights();
  }

  const desabledCart = () => {
    return cartFlights.length === 0
  }
  const table = (
    <MaterialTable
      title="Asientos"
      columns={[
        { title: "Clase", field: "type" },
        { title: "Numero", field: "number" },
        { title: "Ventanilla", field: "nextoWindow" },
        { title: "Precio", field: "cost" },
      ]}
      data={props.seats}
      options={
        {
          search: false,
          paging: false,
          actionsColumnIndex: -1,
        }
      }
      actions={[
        {
          icon: "add",
          tooltip: 'seleccionar vuelo',
          onClick: addCart
        }
      ]}
    />
  )

  return (
    <Fragment>
      {props.seats.length === 0 ? <NoDataCard msg="Seleccione un vuelo"/> : table}
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
            onClick={onCartClick}
            disabled={desabledCart()}
          >
            Ver carrito
            </Button>
        </Grid>
      </Grid>

    </Fragment>
  )
}