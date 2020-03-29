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

const UserDataComponent = (props) => {
  const classes = style();
  const user = props.user.data;
  const [showCash, setShowCash] = useState(false);

  const showAddCash = () => {
    setShowCash(true);
  }

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
              <Typography className={classes.margin5}>Saldo: ${user.cash.toFixed(2)}     <Button color="primary" variant="contained" onClick={showAddCash}>Agregar Saldo</Button></Typography>
              { showCash ? <AddCash id={user.id}/> : <div></div>}
              <Typography>Tabla Amigos</Typography>
              <FriendsTable id={user.id}></FriendsTable>
              <Button color="primary" variant="contained">Agregar Amigo</Button>
              <Button color="secondary" variant="contained">Quitar Amigo</Button>
            </Grid>
          </Grid>
      </Fragment>
  )
}

const TicketsFooter = (props) => {
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

const FriendsTable = (props) => {
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

const TicketsPurchasedTable = (props) => {
    const classes = style();
    const id = props.id;
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

const AddCash = (props) => {
  const id = props.id;
  console.log(props)
  const profileService = new ProfileService();
  const [quantity, setQuantity] = useState(0);

  const addCash = () => {
    if(quantity > 0){
      profileService.addCash(id, quantity)
      .then( resp => { alert(resp.status) })
      .catch( err => { alert(err) })
    }
  }

  const update = e => {
    setQuantity(e.target.valueAsNumber);
  }

  return (
    <div>
      <TextField
      variant="outlined"
      margin="normal"
      name="quantity"
      label="Cuanto quieres agregar?"
      type="number"
      id="quantity"
      value={quantity}
      onChange={update}
      >
      </TextField>
      <Button color="primary" variant="contained" onClick={addCash}>+</Button>
    </div>
  )
}