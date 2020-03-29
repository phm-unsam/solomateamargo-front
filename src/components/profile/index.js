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
import { useSelector } from 'react-redux'
import ProfileService from '../../services/profileService'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
    name: "",
    lastName: "",
    age: 0,
    username: "",
    password: "",
    userId: "",
    profilePhoto: "",
    cash: 0,
    id: ""
  });
  let login = useSelector(store => store.login);
  const profileService = new ProfileService();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if(!isLoaded){
      profileService.getProfile(login.id)
      .then( profile => {
        setUser(profile)
        setIsLoaded(true);
      })
      .catch( err => alert(err))
      }
    }
  );

  return(
    <div>
      {
       isLoaded ? 
        <div>
          <UserDataComponent user={user}></UserDataComponent>
          <TicketsFooter user={user}></TicketsFooter>
        </div>
        :
        <h1>LOADING . . .</h1>
      }
    </div>
  )  
}

function UserDataComponent(props){
  const classes = style();
  const user = props.user.data;

  return(
    <Fragment>
          <Grid container spacing={3} className={classes.margin5}>
            <Grid item xs={3}>
              <img src={user.profilePhoto} alt="Profile Photo" className={classes.img}></img>
            </Grid>
            <Grid item xs={9}>
            <Typography component="h3" variant="h4">{`${user.name} ${user.lastName}`}</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={user.password}
              /> <br/>
              <TextField
                variant="outlined"
                margin="normal"
                name="age"
                label="Edad"
                type="text"
                id="age"
                value={user.age}
              />
              <Typography className={classes.margin5}>Saldo: ${user.cash}     <Button color="primary" variant="contained">Agregar Saldo</Button></Typography>
              <Typography>Tabla Amigos</Typography>
              <FriendsTable id={user.id}></FriendsTable>
              <Button color="primary" variant="contained">Agregar Amigo</Button>
              <Button color="secondary" variant="contained">Quitar Amigo</Button>
            </Grid>
          </Grid>
      </Fragment>
  )
}

function TicketsFooter(props){
  const classes = style();
  const user = props.user.data;

  return(
    <Fragment>
        <Grid item xs={12}>
            <p>Pasajes comprados</p><br/>
            <TicketsPurchasedTable id={user.id}></TicketsPurchasedTable>
            <Button color="primary" variant="contained">Aceptar</Button>
            <Button color="secondary" variant="contained">Cancelar</Button>
          </Grid>
    </Fragment>  
  )
}

function FriendsTable(props){
    const classes = style();
    const id = props.id
    const [friends, setFriends] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const profileService = new ProfileService();

    useEffect(() => {
      if(!isLoaded){
        profileService.getFriends(id)
        .then( friends => {
          setFriends(friends.data);
          setIsLoaded(true);
        })  
        .catch( err => alert(err))
      }
    });
    
    return(
      <div>
      {
        isLoaded ?
        
          <TableContainer className={classes.margin5}>
          <Table className={classes.table} spacing={3}>
              <TableHead>
              <TableRow>
                  <StyledTableCell align="center">Nombre</StyledTableCell>
                  <StyledTableCell align="center">Apellido</StyledTableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {friends.map(friend => (
                  <TableRow key={friend.id}>
                      <TableCell align="center" component="th" scope="row">{friend.name} </TableCell>
                      <TableCell align="center">{friend.lastName}</TableCell>
                  </TableRow>
              ))}
              </TableBody>
          </Table>
        </TableContainer>

        :

        <h1>LOADING . . .</h1>
      }
      </div>
    )
}

function TicketsPurchasedTable(props){
    const classes = style();
    const id = props.id
    const [tickets, setTickets] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const profileService = new ProfileService();

    useEffect(() => {
      if(!isLoaded){
        profileService.getPurchases(id)
        .then( tickets => {
          setTickets(tickets.data);
          setIsLoaded(true);
        })  
        .catch( err => alert(err))
      }
    });
    
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
                {tickets.map((ticket, index) => (
                    <TableRow key={index}>
                        <TableCell align="center" component="th" scope="row">{ticket.from} </TableCell>
                        <TableCell align="center">{ticket.to}</TableCell>
                        <TableCell align="center">{ticket.departure}</TableCell>
                        <TableCell align="center">{ticket.purchaseDate}</TableCell>
                        <TableCell align="center">{ticket.airline}</TableCell>
                        <TableCell align="center">{"$" + ticket.cost}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}