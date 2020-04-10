import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartLoad } from '../../redux/actions/cartAction';
import './Cart.css'
import { deleteAll, deleteFlightReservation, buyTicket} from '../../redux/actions/cartAction'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import TableCreator from '../tableCreator/TableCreator'

export default function Cart() {
  const dispatch = useDispatch();
  const flights = useSelector(state => state.cartReducer.flights);
  const login = useSelector(store => store.login);
  let history = useHistory();

  useEffect(() => {
    getAllCart()
  }, [])
  const [flightSelect, setFlightSelect] = useState({
    id: ''
  })
  const onFlightsClick = e => {
    history.push("/");
  }

  const getAllCart = () => {
      dispatch(cartLoad(login.id))
  }
  const sumaTotal = () => {
    let total = 0

    Array.from(flights).forEach(flight =>
      total += flight.cost)

    return total
  }

  const deleteFlight = async () => {

    const { value: deleteAlert } = await Swal.fire({
      title: 'Estas Seguro?',
      text: "Desea eliminar ese pasaje",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    })
    if (deleteAlert) {
        dispatch(deleteFlightReservation(flightSelect, login.id))
        setFlightSelect({ id: '' })
        getAllCart()
        
    }
  }

  const deleteAllflights = () => {
    dispatch(deleteAll(login.id))
    getAllCart()
  }

  const buyTicketsFlights = async (e) => {
    e.preventDefault()

    const alert = await Swal.fire({
      title: 'Estas Seguro?',
      text: "Desea comprar todos los items",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    })
    if (alert.value) {
      dispatch(buyTicket(login.id))
      getAllCart()
      return alert
    }
  }

  const columnName = [
    { name: 'origen' }, { name: 'destino' }, { name: 'Salida' }, { name: 'Aerolinea' }, { name: 'Asiento' }, { name: 'Clase' }, { name: 'Desde' }
  ]

  const selectApurchase = (flight) => {
    setFlightSelect(flight)
  }

  const disabledFligh = () => {
    return flightSelect.id === ""
  }
  return (
    <Fragment>
      <TableCreator data={flights} columnName={columnName} bodyAction={selectApurchase} />
      <Button className="buton"
        variant="contained"
        color="secondary"
        onClick={() => deleteFlight()}
        disabled={disabledFligh()}
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
          <Button type="submit" variant="contained" color="primary" disabled={flights.length === 0}>Comprar</Button>
        </div>
      </form>

    </Fragment>
  )
}

