import React, { Fragment, useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Compra from './Compra';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerCarritoDeCompras } from '../actions/CarritoDeComprasAction';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import './carritoDeCompras.css'
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
export default function CarritoDeCompras() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const compras = useSelector(state => state.compras.compras);
  
  useEffect(() => {
    const cargarListadoCompras = () => dispatch(obtenerCarritoDeCompras());
    cargarListadoCompras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <TableContainer component={Paper} className="container">
        <h1>Carrito de Compras</h1>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Origen</StyledTableCell>
              <StyledTableCell align="right">Destino</StyledTableCell>
              <StyledTableCell align="right">Salida</StyledTableCell>
              <StyledTableCell align="right">Aerolinea</StyledTableCell>
              <StyledTableCell align="right">Asiento</StyledTableCell>
              <StyledTableCell align="right">Clase</StyledTableCell>
              <StyledTableCell align="right">Precio</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(compras).map(articulo => (<Compra listaCompra={compras[articulo]} key={articulo} />))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="botones">
        <Button variant="contained" color="primary">Limpar carro</Button>

      </div>
    </Fragment>
  )


}
