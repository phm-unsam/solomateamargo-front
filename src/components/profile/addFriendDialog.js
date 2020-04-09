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

	let possibleFriends = props.possibleFriends;
  let addFriend = props.addFriend;

  const { onClose, selectedValue, open } = props;
  
  const [toAddFriend, setToAddFriend] = useState({ id: null, name: '', lastName: '' });

  const handleClose = () => {
    onClose(selectedValue);
  };


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={"sm"} spacing={3}>
        <DialogTitle id="simple-dialog-title"><Typography>Posibles amigos</Typography></DialogTitle>
        <DialogContent>
          <div className={classes.dialog}>
            <GenericFriendsTable friends={possibleFriends} actionOnClick={setToAddFriend} noDataMsg={"No tiene amigos para agregar..."}/>          
            { toAddFriend.id === null ? <Typography spacing={2}>Seleccione un amigo para agregar...</Typography> :  <Button color="primary" variant="contained" onClick={() => addFriend(toAddFriend, setToAddFriend)} spacing={2}>{ `Agregar a ${toAddFriend.name} ${toAddFriend.lastName}` }</Button> }
          </div>
        </DialogContent>
    </Dialog>
  );
}

AddFriendDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};