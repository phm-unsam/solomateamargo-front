import React, { useState, Fragment, useEffect }  from 'react';
import { withStyles } from '@material-ui/core/styles';
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
        setUser(profile.data)
        setIsLoaded(true);
      })
      .catch( err => alert(err));
      }
    }
  );

  const saveChanges = () => {
    profileService.updateProfile(user)
      .then( status => {
        console.log("todo ok");
      })
      .catch( err => alert(err));
  };
  

  return(
    <div>
      {
       isLoaded ? 
        <div>
          <UserDataComponent user={user} setUser={setUser}></UserDataComponent>
          <p>Pasajes comprados</p><br/>
          <TicketsPurchasedTable id={user.id}></TicketsPurchasedTable>
          <Button color="primary" variant="contained" onClick={saveChanges}>Aceptar</Button>
          <Button color="secondary" variant="contained">Cancelar</Button>
        </div>
        :
        <h1>LOADING . . .</h1>
      }
    </div>
  )  
}

const UserDataComponent = (props) => {
  const classes = style();
  const user = props.user;
  const setUser = props.setUser;
  const [showCash, setShowCash] = useState(false);

  const showAddCash = () => {
    setShowCash(true);
  }

  const update = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  return(
    <Fragment>
          <Grid container spacing={3} className={classes.margin5}>
            <Grid item xs={3}>
              <img src={user.profilePhoto} alt="User" className={classes.img}></img>
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
                onChange={update}
              /> <br/>
              <TextField
                variant="outlined"
                margin="normal"
                name="age"
                label="Edad"
                type="text"
                id="age"
                value={user.age}
                onChange={update}
              />
              <Typography className={classes.margin5}>Saldo: ${user.cash.toFixed(2)}     <Button color="primary" variant="contained" onClick={showAddCash}>Agregar Saldo</Button></Typography>
              { showCash ? <AddCash user={user} setUser={setUser} setShowCash={setShowCash}/> : <div></div>}
              <Typography>Tabla Amigos</Typography>
              <FriendsTable id={user.id}></FriendsTable>
            </Grid>
          </Grid>
      </Fragment>
  )
}

const FriendsTable = (props) => {
    const classes = style();
    const id = props.id
    const [friends, setFriends] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [toDeleteFriend, setToDeleteFriend] = useState({ id: null, name: '', lastName: '' })
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

    const deleteFriend = () => {
      let idFriendToDelete = toDeleteFriend.id;
      if(idFriendToDelete !== null){
        profileService.deleteFriend(id, idFriendToDelete)
        .then( status => {
          alert('Usuario eliminado correctamente.'); //Aca hay q meterle algo lindo.
          setFriends(friends.filter(friend => friend !== toDeleteFriend))
        })  
        .catch( err => alert(err))
      }
    }

    return(
      <div>
      {
        isLoaded ?
        <div>
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
                  <TableRow key={friend.id} hover onClick={() => setToDeleteFriend(friend)}>
                      <TableCell align="center" component="th" scope="row">{friend.name}</TableCell>
                      <TableCell align="center">{friend.lastName}</TableCell>
                  </TableRow>
              ))}
              </TableBody>
          </Table>
        </TableContainer>
        <Button color="primary" variant="contained">Agregar Amigo</Button>
        { toDeleteFriend.id === null ?  <Typography>Seleccione un amigo para eliminar...</Typography> :  <Button color="secondary" variant="contained" onClick={deleteFriend}>{ `Quitar a ${toDeleteFriend.name} ${toDeleteFriend.lastName}` }</Button> }
        </div>

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
                    <TableRow key={index} hover>
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
  const user = props.user;
  const setUser = props.setUser;
  const setShowCash = props.setShowCash;
  const profileService = new ProfileService();
  const [quantity, setQuantity] = useState(0);

  const addCash = () => {
    if(quantity > 0){
      profileService.addCash(user.id, quantity)
      .then( resp => {
        let tmp = user.cash
        setUser({
          ...user,
          cash: tmp + quantity          
        })
        alert(resp.status);
        setShowCash(false);
      })
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
      <Button color="primary" variant="contained" style={{marginTop: '25px', marginLeft: '5px'}} onClick={addCash}>+</Button>
    </div>
  )
}