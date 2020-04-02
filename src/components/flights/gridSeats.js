import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

//css
import { useStyles, StyledTableCell } from './style'

import { useDispatch } from 'react-redux';
import { cartLoad } from '../../redux/actions/cartAction';

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
        cartFlights.forEach(cartFlight => sum = sum + cartFlight.cost );
        return sum;
    }
  
    return (
  
      <Fragment>
        <TableContainer className={classes.margin5}>
          <Typography align='left' variant="h4" className={classes.margin5} gutterBottom>
            Selección de Asiento
          </Typography>
          <Table className={classes.table} spacing={3}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Clase</StyledTableCell>
                <StyledTableCell align="center">Numero</StyledTableCell>
                <StyledTableCell align="center">Ventanilla</StyledTableCell>
                <StyledTableCell align="center">Precio</StyledTableCell>
              </TableRow>
            </TableHead>
            {<TableBody>
              {(props.seats).map(seat => (
                <TableRow
                  key={seat.number}
                  hover
                  onClick={() => seatId = (seat.number)}
                >
                  <TableCell align="center" component="th" scope="row">
                    {seat.class}
                  </TableCell>
                  <TableCell align="center">{seat.number}</TableCell>
                  <TableCell align="center">{seat.isNextToWindow ? "Si" : "No"}</TableCell>
                  <TableCell align="center">{"$" + seat.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>}
          </Table>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.buttonAgregarCarrito}
            onClick={() => addCart()}
            disabled={seatId !== null}
          >
            Agregar al carrito
            </Button>
        </TableContainer>
        <Grid container spacing={3} className={classes.margin5}>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>Cantidad de items: {cartFlights.length}</Typography>
            <Typography variant="body1" gutterBottom>Total $ {total()}</Typography>
          </Grid>
          {console.log(cartFlights)}
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