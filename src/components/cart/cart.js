import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartLoad } from '../../redux/actions/cartAction';
import './cart.css'
import { deleteAll, deleteFlightReservation, buyTicket } from '../../redux/actions/cartAction'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import TableCreator from '../tableCreator/tableCreator'

export default function Cart() {
  const dispatch = useDispatch();
  let tickets = []
  tickets = useSelector(state => state.cartReducer.flights);
  const login = useSelector(store => store.login);
  let history = useHistory();

  useEffect(() => {
    getAllCart()
  }, [])

  const onFlightsClick = e => {
    history.push("/");
  }

  const getAllCart = () => {
    dispatch(cartLoad(login.id))
  }

  const deleteFlight = async (flightSelect) => {

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
<<<<<<< HEAD

=======
      getAllCart()
>>>>>>> 83d4bb3f5917ba7573c9ddf72318d4c188207b95
    }
  }

  const deleteAllflights = () => {
    dispatch(deleteAll(login.id))
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
  const isCartEmpty = () => {
<<<<<<< HEAD
    return tickets.numberOfTickets === 0
=======
    return flights.numberOfTickets === 0
>>>>>>> 83d4bb3f5917ba7573c9ddf72318d4c188207b95
  }
  const columnName = [
    { name: 'Origen' }, { name: 'Destino' }, { name: 'Salida' }, { name: 'Aerolinea' }, { name: 'Asiento' }, { name: 'Clase' }, { name: 'Desde' }, { name: 'Accion' }
  ]

  return (
    <Fragment>
<<<<<<< HEAD
      <TableCreator data={tickets.tickets} columnName={columnName} titleButton="Elimina" buttonAction={deleteFlight} />

      <form onSubmit={buyTicketsFlights}>
        <div className="botones">
          <Button variant="contained" color="primary" disabled={tickets} onClick={() => deleteAllflights()}>Limpiar carro</Button>
=======
      <TableCreator data={flights.tickets} columnName={columnName} titleButton="Eliminar" buttonAction={deleteFlight} />

      <form onSubmit={buyTicketsFlights}>
        <div className="botones">
          <Button variant="contained" disabled={isCartEmpty()} color="primary" onClick={() => deleteAllflights()}>Limpiar carro</Button>
>>>>>>> 83d4bb3f5917ba7573c9ddf72318d4c188207b95
        </div>
        <h3 align="left">Total en el carrito: ${tickets.totalCost}</h3>
        <div className="botonesInferior">
          <div className="botonVolver">
            <Button variant="contained" color="secondary" className="buttonVolver" onClick={onFlightsClick}>Volver</Button>
          </div>
          <Button type="submit" variant="contained" color="primary" disabled={tickets}>Comprar</Button>
        </div>
      </form>

    </Fragment>
  )
}

