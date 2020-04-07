import React, { useState, Fragment, useEffect } from 'react';
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
import Loader from '../loader';
import { useHistory } from "react-router-dom";

//Components
import { GenericFriendsTable } from './genericFriendTable';
import { AddFriendDialog } from './addFriendDialog';
import SnackbarOpen from '../snackbar/Snackbar'

import Icon from '@material-ui/core/Icon'

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
  const [user, setUser] = useState({});
  let login = useSelector(store => store.login);
  const profileService = new ProfileService();
  const [isLoaded, setIsLoaded] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
      
  }

  useEffect(() => {
    if (!isLoaded) {
      profileService.getProfile(login.id)
        .then(profile => {
          setUser(profile.data)
          setIsLoaded(true);
        })
        .catch(err => {
          setSnackbar({
            open: true,
            message: err,
            severity: 'error'
          });
        });
    }
  });

  return (
    <div>
      {
        isLoaded ?
          <div>
            <UserDataComponent user={user} setUser={setUser} setSnackbar={setSnackbar} ></UserDataComponent>
            <TicketsPurchasedTable id={user.id} setSnackbar={setSnackbar} ></TicketsPurchasedTable>
            
            <SnackbarOpen open={snackbar.open} message={snackbar.message} severity={snackbar.severity} closeSnac={closeSnackbar}/>
          </div>
          :
          <Loader />
      }
    </div>
  )
}

const UserDataComponent = (props) => {
  const classes = style();
  let history = useHistory();

  const user = props.user;
  const setUser = props.setUser;
  const setSnackbar = props.setSnackbar;

  const [showCash, setShowCash] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const profileService = new ProfileService();

  const showAddCash = () => {
    setShowCash(true);
  }
  const toggleShowPass = () =>{
    setShowPass(!showPass)
  }
  const update = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const saveChanges = () => {
    profileService.updateProfile(user)
      .then(status => {
        setSnackbar({
          open: true,
          message: 'Usuario guardado correctamente!',
          severity: 'success'
        });
      })
      .catch(err => {
        setSnackbar({
          open: true,
          message: err,
          severity: 'error'
        });
      });
  };

  const redirect = () => {
    history.push("/");
  }

  return (
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
            type={showPass ? "text" : "password"}
            id="password"
            value={user.password}
            onChange={update}
          /> 
         
           <Icon style = {{marginTop: "2rem", marginLeft:"1rem"}}
            onClick={toggleShowPass}>visibility</Icon>
          <br />
          <TextField
            variant="outlined"
            margin="normal"
            name="age"
            label="Edad"
            type="text"
            id="age"
            value={user.age}
            onChange={update}
          /><br/>
          <Button color="primary" variant="contained" onClick={saveChanges} className={classes.margin5}>Aceptar</Button>
          <Button color="secondary" variant="contained" onClick={redirect} className={classes.margin5}>Cancelar</Button>
          <Typography className={classes.margin5}>Saldo: ${user.cash.toFixed(2)}     <Button color="primary" variant="contained" onClick={showAddCash} className={classes.margin5}>Agregar Saldo</Button></Typography>
          {showCash ? <AddCash user={user} setUser={setUser} setShowCash={setShowCash} setSnackbar={setSnackbar} /> : <div></div>}
          <Typography component="h5" variant="h6">Amigos</Typography>
          <FriendsTable id={user.id} setSnackbar={setSnackbar}></FriendsTable>
        </Grid>
        
      </Grid>
    </Fragment>
  )
}

const FriendsTable = (props) => {
  const classes = style();

  const id = props.id
  const setSnackbar = props.setSnackbar;

  const [friends, setFriends] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toDeleteFriend, setToDeleteFriend] = useState({ id: null, name: '', lastName: '' });
  const [open, setOpen] = useState(false);

  const profileService = new ProfileService();

  //Para abrir el dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Para cerrar el dialog
  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isLoaded) {
      getFriends(id);
    }
  });

  const deleteFriend = () => {
    let idFriendToDelete = toDeleteFriend.id;
    if (idFriendToDelete !== null) {
      profileService.deleteFriend(id, idFriendToDelete)
        .then(status => {
          setSnackbar({
            open: true,
            message: 'Usuario eliminado correctamente.',
            severity: 'success'
          });
          setFriends(friends.filter(friend => friend !== toDeleteFriend));
          setToDeleteFriend({ id: null });
        })
        .catch(err =>  {
          setSnackbar({
            open: true,
            message: err,
            severity: 'error'
          });
        });
    }
  }

  const addFriend = (newFriend) => {
    getFriends(id);
  }

  const getFriends = (id) => {
    profileService.getFriends(id)
      .then(friends => {
        setFriends(friends.data);
        setIsLoaded(true);
      })
      .catch(err => {
        setSnackbar({
          open: true,
          message: err,
          severity: 'error'
        });
      });
  }

  return (
    <div>
      {
        isLoaded ?
          <div>
            <GenericFriendsTable friends={friends} actionOnClick={setToDeleteFriend} />
            <Button color="primary" variant="contained" onClick={handleClickOpen} >Agregar Amigo</Button>
            <AddFriendDialog open={open} onClose={handleClose} id={id} addFriendsToOriginal={addFriend} setSnackbar={setSnackbar}/>
            {toDeleteFriend.id === null ? <Typography className={classes.margin5}>Seleccione un amigo para eliminar...</Typography> : <Button color="secondary" variant="contained" onClick={deleteFriend} className={classes.margin5}>{`Quitar a ${toDeleteFriend.name} ${toDeleteFriend.lastName}`}</Button>}
          </div>
          :
          <Loader />
      }
    </div>
  )
}

const TicketsPurchasedTable = (props) => {
  const classes = style();

  const id = props.id;
  const setSnackbar = props.setSnackbar;

  const [tickets, setTickets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const profileService = new ProfileService();

  useEffect(() => {
    if (!isLoaded) {
      profileService.getPurchases(id)
        .then(tickets => {
          setTickets(tickets.data);
          setIsLoaded(true);
        })
        .catch(err => {
          setSnackbar({
            open: true,
            message: err,
            severity: 'error'
          });
        });
    }
  });

  return (
    <TableContainer className={classes.margin5}>
      <Typography component="h3" variant="h4">Pasajes comprados</Typography> <br/>
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
  const setSnackbar = props.setSnackbar;
  
  const profileService = new ProfileService();
  const [quantity, setQuantity] = useState(0);

  const addCash = () => {
    if (quantity > 0) {
      profileService.addCash(user.id, quantity)
        .then(resp => {
          let tmp = user.cash
          setUser({
            ...user,
            cash: tmp + quantity
          });
          setSnackbar({
            open: true,
            message: `Has agregado $${quantity} a tu cuenta.`,
            severity: 'success'
          });
          setShowCash(false);
        })
        .catch(err => {
          setSnackbar({
            open: true,
            message: err,
            severity: 'error'
          });
        });
    }
  }

  const update = e => {
    if (isNaN(e.target.valueAsNumber)) {
      setQuantity(0);
      return;
    }
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
      <Button color="primary" variant="contained" style={{ marginTop: '25px', marginLeft: '5px' }} onClick={addCash}>+</Button>
    </div>
  )
}