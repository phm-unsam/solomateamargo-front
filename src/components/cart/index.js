import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartLoad } from '../../redux/actions/cartAction';
import './Cart.css'
import { deleteAll, cartLoadError, deleteFlightReservation, buyTicket } from '../../redux/actions/cartAction'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import TableCreator from '../tableCreator'

export default function Cart() {
  const dispatch = useDispatch();
  const flights = useSelector(state => state.cartReducer.flights);
  const error = useSelector(state => state.cartReducer.error)
  const login = useSelector(store => store.login);
  let history = useHistory();
  const [flight, setFlight] = useState()
  const onFlightsClick = e => {
    history.push("/");
  }
  useEffect(() => {
    getAllCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllCart = () => {
    dispatch(cartLoad(login.id))
    if (flights.length === 0) {
      dispatch(cartLoadError())
    }
  }
  const sumaTotal = () => {
    let total = 0

    Array.from(flights).forEach(flight =>
      total += flight.cost)

    return total
  }

  const deleteFlight = () => {

    Swal.fire({
      title: 'Estas Seguro?',
      text: "un pasaje que se elimina no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteFlightReservation(flight, login.id))
        getAllCart()

      }
    })

  }

  const deleteAllflights = () => {
    dispatch(deleteAll(login.id))
  }

  const buyTicketsFlights = e => {
    e.preventDefault()

    Swal.fire({
      title: 'Estas Seguro?',
      text: "no se puede cancelar la compra",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, comprar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(buyTicket(login.id))

      }
    })

  }

  const columnName = [
    { name: 'origen' }, { name: 'destino' }, { name: 'Salida' }, { name: 'Aerolinea' }, { name: 'Asiento' }, { name: 'Clase' }, { name: 'Desde' }
  ]

  const selectApurchase = (flight) => {
    setFlight(flight)
  }
  return (
    <Fragment>
      {error ? <p>hubo un error</p> : null}
      <TableCreator data={flights} columnName={columnName} bodyAction={selectApurchase} />
        <Button className="buton"
          variant="contained"
          color="secondary"
          onClick={() => deleteFlight()}
        >Eliminar</Button>  

      <form onSubmit={buyTicketsFlights}>
        <div className="botones">
          <Button variant="contained" color="primary" onClick={() => deleteAllflights()}>Limpar carro</Button>
        </div>
        <h3 align="left">Total en Carrito: $ {sumaTotal()}</h3>
        <div className="botonesInferior">
          <div className="botonVolver">
            <Button variant="contained" color="secondary" className="buttonVolver" onClick={onFlightsClick}>Volver</Button>
          </div>
          <Button type="submit" variant="contained" color="primary" >Comprar</Button>
        </div>
      </form>

    </Fragment>
  )
}

