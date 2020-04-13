import React, { useState, Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import style from './style'
import { useSelector } from 'react-redux'
import ProfileService from '../../services/profileService'
import Loader from '../loader';
import { useHistory } from "react-router-dom";
import Icon from '@material-ui/core/Icon'
import MaterialTable from 'material-table';

//Components
import { GenericFriendsTable } from './genericFriendTable';
import { AddFriendDialog } from './addFriendDialog';
import SnackbarOpen from '../snackbar/snackbar'

export default function Profile() {
  let login = useSelector(store => store.login);

  const profileService = new ProfileService();

  const [user, setUser] = useState({});
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
      getProfile();
  });

  const getProfile = async () => {
    if (!isLoaded) {
      try {
        let profile = await profileService.getProfile(login.id);
        setUser(profile);
        setIsLoaded(true);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err,
          severity: 'error'
        });
      }
    }
  }

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

  const saveChanges = async () => {
    try {
      await profileService.updateProfile(user);
      setSnackbar({
        open: true,
        message: 'Usuario guardado correctamente!',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err,
        severity: 'error'
      });
    }
  };

  const redirect = () => {
    history.push("/");
  }

  return (
    <Fragment>
      <Grid container spacing={3}>
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
          <div className={classes.table}>
            <FriendsTable id={user.id} setSnackbar={setSnackbar}></FriendsTable>
          </div>
        </Grid>
        
      </Grid>
    </Fragment>
  )
}

const FriendsTable = (props) => {

  const id = props.id
  const setSnackbar = props.setSnackbar;

  const [friends, setFriends] = useState([]);
  const [possibleFriends, setPossibleFriends] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const profileService = new ProfileService();

  //Para abrir el dialog
  const handleClickOpen = () => {
    getPossibleFriends();
    setOpen(true);
  };

  //Para cerrar el dialog
  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    if(!isLoaded){
      getFriends();
      getPossibleFriends();
    }
  });

  const deleteFriend = async (e, toDeleteFriend) => {
    if (toDeleteFriend.id !== null) {
      try {
        await profileService.deleteFriend(id, toDeleteFriend.id);
        setSnackbar({
          open: true,
          message: `Has eliminado a ${toDeleteFriend.name} ${toDeleteFriend.lastName} de tu lista de amigos.`,
          severity: 'success'
        });
        setFriends(friends.filter(friend => friend !== toDeleteFriend));
      } catch (err) {
        let errorMsg = err.toString();
        setSnackbar({
          open: true,
          message: errorMsg,
          severity: 'error'
        });
      }
    }
  }

  const getFriends = async () => {
      try {
        let friends = await profileService.getFriends(id);
        setFriends(friends);
        setIsLoaded(true);
      } catch (err) {
        let errorMsg = err.toString();
        setSnackbar({
          open: true,
          message: errorMsg,
          severity: 'error'
        });
      }
  }

  const getPossibleFriends = async () => {
    try {
      let possibleFriends = await profileService.possibleFriends(id);
      setPossibleFriends(possibleFriends);
    } catch (err) {
      let errorMsg = err.toString();
      setSnackbar({
        open: true,
        message: errorMsg,
        severity: 'error'
      });
    }
  }

  const addFriend = async (e, friendToAdd) => {
    try {
      await profileService.addFriend(id, friendToAdd.id);
      setSnackbar({
        open: true,
        message: `Has agregado a ${friendToAdd.name} ${friendToAdd.lastName} a tu lista de amigos.`,
        severity: 'success'
      });
      getPossibleFriends();
      getFriends();
    } catch (err) {
      let errorMsg = err.toString();
      setSnackbar({
        open: true,
        message: errorMsg,
        severity: 'error'
      });
    }
  }

  return (
    <div>
      {
        isLoaded ?
          <div>
            <GenericFriendsTable friends={friends} actionOnClick={deleteFriend} noDataMsg={"No tiene amigos..."} titleButton={"Eliminar"} title={"Amigos"} icon={"delete"}/>
            <Button color="primary" variant="contained" onClick={handleClickOpen} style={{margin: '5px'}}>Agregar Amigo</Button>
            <AddFriendDialog open={open} onClose={handleClose} possibleFriends={possibleFriends} addFriend={addFriend} setSnackbar={setSnackbar}/>
          </div>
          :
          <Loader />
      }
    </div>
  )
}

const TicketsPurchasedTable = (props) => {

  const id = props.id;
  const setSnackbar = props.setSnackbar;

  const [tickets, setTickets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const profileService = new ProfileService();

  useEffect(() => {
    getPurchases();
  });

  const getPurchases = async () => {
    if (!isLoaded) {
      try {
        let tickets = await profileService.getPurchases(id);
        setTickets(tickets);
        setIsLoaded(true);
      } catch (err) {
        let errMsg = err.toString();
        setSnackbar({
          open: true,
          message: errMsg,
          severity: 'error'
        });
      }
    }
  }

  return (
    <div spacing={3}>
      <MaterialTable
            title={"Pasajes comprados"}
            columns={[
              { title: "Origen", field: "from" },
              { title: "Destino", field: "to" },
              { title: "Salida", field: "departure" },
              { title: "Comprado", field: "purchaseDate" },
              { title: "Aerolinea", field: "airline" },
              { title: "Precio", field: "cost" },

            ]}
            data={tickets}
            options={
              {
                search: false,
                paging: false,
              }
            }
            localization={
              {
                body: { emptyDataSourceMessage: "No tiene pasajes comprados." }
              }
            }
          />
    </div>
  )
}

const AddCash = (props) => {
  const user = props.user;
  const setUser = props.setUser;
  const setShowCash = props.setShowCash;
  const setSnackbar = props.setSnackbar;
  
  const profileService = new ProfileService();
  const [quantity, setQuantity] = useState(0);

  const addCash = async () => {
    if (quantity > 0) {
      try {
        await profileService.addCash(user.id, quantity)
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
      } catch (err) {
        let errMsg = err.toString();
        setSnackbar({
          open: true,
          message: errMsg,
          severity: 'error'
        });
      }
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
