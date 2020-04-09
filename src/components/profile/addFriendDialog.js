import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ProfileService from '../../services/profileService'
import Loader from '../loader';
import { GenericFriendsTable } from './genericFriendTable';
import Typography from '@material-ui/core/Typography';
import { DialogContent } from '@material-ui/core';
import style from './style'

export const AddFriendDialog = (props) => {
  const classes = style();

	let id = props.id;
  let addFriendsToOriginal = props.addFriendsToOriginal;
  let setSnackbar = props.setSnackbar;

  const { onClose, selectedValue, open } = props;
  
	const [friends, setFriends] = useState([]);
	const [isLoaded, setisLoaded] = useState(false);
  const [toAddFriend, setToAddFriend] = useState({ id: null, name: '', lastName: '' });
  
  const profileService = new ProfileService();

  useEffect(() => {
    getPossibleFriends();
  });

  const getPossibleFriends = async () => {
    if(!isLoaded){
      try {
        let possibleFriends = await profileService.possibleFriends(id);
        setFriends(possibleFriends);
        setisLoaded(true);
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

  const handleClose = () => {
    onClose(selectedValue);
  };
	
  const addFriend = async () => {
    let idFriendToAdd = toAddFriend.id;

    try {
      await profileService.addFriend(id, idFriendToAdd);
      setSnackbar({
        open: true,
        message: `Has agregado a ${toAddFriend.name} ${toAddFriend.lastName} a tu lista de amigos.`,
        severity: 'success'
      });
      addFriendsToOriginal(toAddFriend);
      setFriends(friends.filter(friend => friend !== toAddFriend));
      setToAddFriend({id: null});	
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
		isLoaded ?
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={"sm"} spacing={3}>
        <DialogTitle id="simple-dialog-title"><Typography>Posibles amigos</Typography></DialogTitle>
        <DialogContent>
          <div className={classes.dialog}>
            <GenericFriendsTable friends={friends} actionOnClick={setToAddFriend} noDataMsg={"No tiene amigos para agregar..."}/>          
            { toAddFriend.id === null ? <Typography spacing={2}>Seleccione un amigo para agregar...</Typography> :  <Button color="primary" variant="contained" onClick={addFriend} spacing={2}>{ `Agregar a ${toAddFriend.name} ${toAddFriend.lastName}` }</Button> }
          </div>
        </DialogContent>
    </Dialog>
		:
		<Loader />
  );
}

AddFriendDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};