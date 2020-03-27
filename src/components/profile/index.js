import React, { useState, Fragment, useEffect }  from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import style from './style'
import { useParams } from "react-router-dom";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const friendsData = [
    {
        "id": "U1",
        "Nombre": "Pedro",
        "Edad": 25
    },
    {
        "id": "U2",
        "Nombre": "Agustin",
        "Edad": 37
    },
    {
        "id": "U3",
        "Nombre": "Ricardo",
        "Edad": 18
    }
]

const flightsTest = [
    {
        id: 'F1',
        origin: 'Buenos Aires',
        destination: 'Madrid',
        airline: 'Histeria',
        departure: 'new Date()',
        dateOfPurchase: 'new Date()',
        stopoversAmount: 1,
        flightDuration: 12,
        price: 30000
    },
    {
        id: 'F2',
        origin: 'Rosario',
        destination: 'Rawson',
        airline: 'Lineaero',
        departure: 'new Date()',
        dateOfPurchase: 'new Date()',
        stopoversAmount: 3,
        flightDuration: 10,
        price: 10000
    },
    {
        id: 'F3',
        origin: 'Frankfrut',
        destination: 'Rawson',
        airline: 'Blitish',
        departure: 'new Date()',
        dateOfPurchase: 'new Date()',
        stopoversAmount: 1,
        flightDuration: 3,
        price: 25000
    }
  ];

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({

  });

  useEffect(() => {
    console.log(id);
    
    //do api call
  })

  return(
    <div>
      <UserDataComponent user={user}></UserDataComponent>
      <TicketsFooter></TicketsFooter>
    </div>
  )  
}

function UserDataComponent(props){
  const classes = style();

  return(
    <Fragment>
        <Grid container spacing={3} className={classes.margin5}>
          <Grid item xs={3}>
            <p>foto del chabon</p>
          </Grid>
          <Grid item xs={9}>
          <Typography component="h3" variant="h4">Nombre Usuario</Typography>
          <TextField
              variant="outlined"
              margin="normal"
              name="password"
              label="Contraseña"
              type="password"
              id="password"
            /> <br/>
            <TextField
              variant="outlined"
              margin="normal"
              name="age"
              label="Edad"
              type="text"
              id="age"
            />
            <Typography className={classes.margin5}>Saldo: $15.000      <Button color="primary" variant="contained">Agregar Saldo</Button></Typography>
            <Typography>Tabla Amigos</Typography>
            <FriendsTable></FriendsTable>
            <Button color="primary" variant="contained">Agregar Amigo</Button>
            <Button color="secondary" variant="contained">Quitar Amigo</Button>
          </Grid>
          
        </Grid>
      </Fragment>
  )
}

function TicketsFooter(){
  const classes = style();

  return(
    <Fragment>
        <Grid item xs={12}>
            <p>Pasajes comprados</p><br/>
            <TicketsPurchasedTable></TicketsPurchasedTable>
            <Button color="primary" variant="contained">Aceptar</Button>
            <Button color="secondary" variant="contained">Cancelar</Button>
          </Grid>
    </Fragment>  
  )
}

function FriendsTable(){
    const classes = style();
    
    return(
        <TableContainer className={classes.margin5}>
            <Table className={classes.table} spacing={3}>
                <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Nombre</StyledTableCell>
                    <StyledTableCell align="center">Apellido</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {friendsData.map(friend => (
                    <TableRow key={friend.id}>
                        <TableCell align="center" component="th" scope="row">{friend.Nombre} </TableCell>
                        <TableCell align="center">{friend.Edad}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function TicketsPurchasedTable(){
    const classes = style();
    
    return(
        <TableContainer className={classes.margin5}>
            <Table className={classes.table} spacing={3}>
                <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Origen</StyledTableCell>
                    <StyledTableCell align="center">Destino</StyledTableCell>
                    <StyledTableCell align="center">Salida</StyledTableCell>
                    <StyledTableCell align="center">Comprado</StyledTableCell>
                    <StyledTableCell align="center">Aerolinea</StyledTableCell>
                    <StyledTableCell align="center">Precio</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {flightsTest.map(flight => (
                    <TableRow key={flight.id}>
                        <TableCell align="center" component="th" scope="row">{flight.origin} </TableCell>
                        <TableCell align="center">{flight.destination}</TableCell>
                        <TableCell align="center">{flight.departure}</TableCell>
                        <TableCell align="center">{flight.dateOfPurchase}</TableCell>
                        <TableCell align="center">{flight.airline}</TableCell>
                        <TableCell align="center">{"$" + flight.price}</TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}