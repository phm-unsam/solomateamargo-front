import React, { Fragment } from 'react';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

//css
import { useStyles, StyledTableCell } from './Style'


export const GridFlights = (props) => {
    const classes = useStyles();
    const { flights } = props;
  
    return (
      <Fragment>
  
        <TableContainer className={classes.margin5}>
          <Table className={classes.table} spacing={3}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Origen</StyledTableCell>
                <StyledTableCell align="center">Destino</StyledTableCell>
                <StyledTableCell align="center">Aerolinea</StyledTableCell>
                <StyledTableCell align="center">Salida</StyledTableCell>
                <StyledTableCell align="center">Escala</StyledTableCell>
                <StyledTableCell align="center">Duracion</StyledTableCell>
                <StyledTableCell align="center">Desde</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.lenghts === 0 ? 'no hay vuelos disponibles' : flights.map(flight => (
                <TableRow key={flight.id} hover onClick={() => props.getAllSeats(flight.id)}>
                  <TableCell align="center" component="th" scope="row">{flight.from}</TableCell>
                  <TableCell align="center">{flight.to}</TableCell>
                  <TableCell align="center">{flight.airlineName}</TableCell>
                  <TableCell align="center">{flight.DepartureDate}</TableCell>
                  <TableCell align="center">{flight.stopoversAmount}</TableCell>
                  <TableCell align="center">{flight.flightDuration}</TableCell>
                  <TableCell align="center">{"$" + flight.baseCost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    )
  }