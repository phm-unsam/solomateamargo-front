import React  from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { GenericFriendsTable } from './genericFriendTable';
import Typography from '@material-ui/core/Typography';
import { DialogContent } from '@material-ui/core';
import style from './style'

export const AddFriendDialog = (props) => {
  const classes = style();

	let possibleFriends = props.possibleFriends;
  let addFriend = props.addFriend;

  const { onClose, selectedValue, open } = props;
  

  const handleClose = () => {
    onClose(selectedValue);
  };

  //`Agregar a ${toAddFriend.name} ${toAddFriend.lastName}`


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={"sm"} spacing={3}>
        <DialogTitle id="simple-dialog-title"><Typography>Posibles amigos</Typography></DialogTitle>
        <DialogContent>
          <div className={classes.dialog}>
            <GenericFriendsTable friends={possibleFriends} actionOnClick={addFriend} noDataMsg={"No tiene amigos para agregar..."} titleButton={"Agregar"}/>          
          </div>
        </DialogContent>
    </Dialog>
  );
}

AddFriendDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};