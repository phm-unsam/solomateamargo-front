import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../redux/actions/cartAction';
import './Cart.css'
import { deleteAllAction } from '../redux/actions/cartAction'
import WithFlightsTable from './WithFlightsTable'
import Button from '@material-ui/core/Button';



import Table from '@material-ui/core/Table';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';

import Passage from './Passage'

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

function Cart() {
  const dispatch = useDispatch();
  const classes = useStyles();
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
      <div className="cart">

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
      </div>



      <div className="containerSeat">

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right" >Asiento</StyledTableCell>
                <StyledTableCell align="right" >Clase</StyledTableCell>
                <StyledTableCell align="right" >Precio</StyledTableCell>
                <StyledTableCell align="right" >Accion</StyledTableCell>
              </TableRow>
            </TableHead>
          </Table>
      <div className="contain">

       <TableBody>
            {Object.keys(flights).map(flight => (<Passage listaCompra={flights[flight]} key={flight} />))}
          </TableBody>
      </div>
        </TableContainer>
      </div>


    </Fragment>
  )
}

export default WithFlightsTable(Cart)