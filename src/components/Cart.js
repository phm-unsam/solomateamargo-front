import React, { Fragment, useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Flight from './Flights';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../redux/actions/cartAction';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import './Cart.css'
import {deleteAllAction} from '../redux/actions/cartAction'
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Cart() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const flights = useSelector(state => state.flights.flights);


  useEffect(() => {
    dispatch(getCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sumaTotal = () => {
    let total = 0
    flights.forEach(flight =>
      total += flight.price)

    return total
  }

  const deleteAll = () => {
    dispatch(deleteAllAction())
  }
  return (
    <Fragment>
      <div className="container">

      <TableContainer component={Paper}>
        <h1>Carrito de Compras</h1>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Origen</StyledTableCell>
              <StyledTableCell align="right">Destino</StyledTableCell>
              <StyledTableCell align="right">Salida</StyledTableCell>
              <StyledTableCell align="right">Aerolinea</StyledTableCell>
              <StyledTableCell align="right">Asiento</StyledTableCell>
              <StyledTableCell align="right">Clase</StyledTableCell>
              <StyledTableCell align="right">Precio</StyledTableCell>
              <StyledTableCell align="right">Accion</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(flights).map(flight => (<Flight listaCompra={flights[flight]} key={flight} />))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      <div className="botones">
        <Button variant="contained" color="primary" onClick={() => deleteAll()}>Limpar carro</Button>
      </div>

      <h3 align="left">Total en Carrito: $ {sumaTotal()}</h3>

      <div className="botonesInferior">
    <div className="botonVolver">
        <Button variant="contained" color="secondary">Volver</Button>

    </div>
        <Button variant="contained" color="primary">Comprar</Button>
      </div>

    </Fragment>
  )
}