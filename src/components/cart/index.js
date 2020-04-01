import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartLoad } from '../../redux/actions/cartAction';
import './Cart.css'
import { deleteAll, cartLoadError, deleteFlightReservation, buyTicket } from '../../redux/actions/cartAction'

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import { useStyles, StyledTableCell } from './style'
import Swal from 'sweetalert2'
export default function Cart() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const flights = useSelector(state => state.cartReducer.flights);
  const error = useSelector(state => state.cartReducer.error)
  const loading = useSelector(state => state.cartReducer.loading)
  const login = useSelector(store => store.login);
 
  const buyTickets = (ticket) => dispatch(buyTicket(ticket))

  useEffect(() => {
    getAllCart()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllCart = () =>{
    dispatch(cartLoad(login.id))
    console.log(flights)
    if (flights.length !== 0) {
      dispatch(cartLoadError())
    }
  }
  const sumaTotal = () => {
    let total = 0

    Array.from(flights).forEach(flight =>
      total += flight.cost)

    return total
  }

  const deleteFlight = flight => {

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
        flights.forEach(flight =>
          buyTickets(
            flight
          )
        )
      }
    })

  }

  return (
    <Fragment>
      {console.log(flights)}
      {error ? <p>hubo un error</p> : null}

      {loading ? <p>hubo un error</p> : null}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Origen</StyledTableCell>
              <StyledTableCell align="center">Destino</StyledTableCell>
              <StyledTableCell align="center">Salida</StyledTableCell>
              <StyledTableCell align="center">Aerolinea</StyledTableCell>
              <StyledTableCell align="center">Asiento</StyledTableCell>
              <StyledTableCell align="center">Clase</StyledTableCell>
              <StyledTableCell align="center">Precio</StyledTableCell>
              <StyledTableCell align="center">Accion</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {Array.from(flights).length === 0 ? 'no hay pasajes' : (Array.from(flights).map(flight =>
              <TableRow key={flight.id}>
                
                <StyledTableCell align="center">{flight.from}</StyledTableCell>
                <StyledTableCell align="center">{flight.to}</StyledTableCell>
                <StyledTableCell align="center">{flight.departure}</StyledTableCell>
                <StyledTableCell align="center">{flight.airline}</StyledTableCell>
                <StyledTableCell align="center">{flight.seatNumber}</StyledTableCell>
                <StyledTableCell align="center">{flight.seatType}</StyledTableCell>
                <StyledTableCell align="center">{flight.cost}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button className="buton"
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteFlight(flight)}
                  >Eliminar</Button>
                </StyledTableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>

      </TableContainer>
      <form onSubmit={buyTicketsFlights}>

        <div className="botones">
          <Button variant="contained" color="primary" onClick={() => deleteAllflights()}>Limpar carro</Button>
        </div>
        <h3 align="left">Total en Carrito: $ {sumaTotal()}</h3>
        <div className="botonesInferior">
          <div className="botonVolver">
            <Button variant="contained" color="secondary" className="buttonVolver"><Link to={'/vuelos'}>Volver</Link></Button>
          </div>
          <Button type="submit" variant="contained" color="primary" >Comprar</Button>
        </div>
      </form>

    </Fragment>
  )
}

