import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAll, deleteFlightReservation, buyTicket, cartLoad } from '../../redux/actions/cartAction'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import MaterialTable from 'material-table'
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';

import { useStyles } from './style'
export default function Cart() {
  const classes = useStyles()
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartReducer.flights);
  const login = useSelector(store => store.login);
  let history = useHistory();


  useEffect(() => {
    dispatch(cartLoad({ loggedId: login.id }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const redirectHome = e => {
    history.push("/");
  }

  const deleteFlight = async (e, flightSelect) => {
    const { value: deleteAlert } = await Swal.fire({
      title: 'Estas seguro?',
      text: "Desea eliminar este pasaje?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    })

    if (deleteAlert) {
      dispatch(deleteFlightReservation(flightSelect, login.id))
    }
  }

  const deleteAllflights = async () => {
    const { value: deleteAlert } = await Swal.fire({
      title: 'Estas seguro?',
      text: "Desea eliminar todos los tickets?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    })

    if (deleteAlert) {
      dispatch(deleteAll(login.id))
    }

  }

  const buyTicketsFlights = async (e) => {
    e.preventDefault()

    const alert = await Swal.fire({
      title: 'Estas seguro?',
      text: "Desea comprar todos los items?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    })
    if (alert.value) {
      dispatch(buyTicket(login.id))
      return alert
    }
  }

  return (
    <Fragment>
      <MaterialTable
        title="Carrito de compra"
        columns={[
          { title: "Origen", field: "from" },
          { title: "Destino", field: "to" },
          { title: "Salida", field: "departure" },
          { title: "Aerolinea", field: "airline" },
          { title: "Asiento", field: "seatNumber" },
          { title: "Clase", field: "seatType" },
          { title: "Precio", field: "cost" },
        ]}
        data={cart.tickets}
        options={
          {
            search: false,
            paging: false,
            actionsColumnIndex: -1,
          }
        }
        actions={[
          {
            icon: "delete",
            tooltip: 'Eliminar ticket',
            onClick: deleteFlight
          },
          {
            icon: "remove_shopping_cart",
            tooltip: 'Eliminar Carrito',
            onClick: deleteAllflights,
            isFreeAction: true,
            hidden: cart.numberOfTickets === 0
          }
        ]}
        localization={
          {
            body: { emptyDataSourceMessage: "No hay items en el carrito" },
            header: { actions: "Acciones" }
          }
        }
      />

      <form onSubmit={buyTicketsFlights}>
        <Card className={classes.marginCard}>
          <CardContent>
            <Typography variant="h5" component="h1">
              Carrito de compras
            </Typography><br/>
            <Typography variant="h6" component="h3">
            Total en el carrito: ${cart.totalCost}
            </Typography>
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" disabled={cart.numberOfTickets === 0} color="primary">Comprar</Button>
            <Button variant="contained" onClick={redirectHome}>Volver</Button>
          </CardActions>
        </Card>
      </form>
    </Fragment>
  )
}

