import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ProfileService from '../../services/profileService'
import Loader from '../loader';
import { GenericFriendsTable } from './genericFriendTable';
import Typography from '@material-ui/core/Typography';



export const AddFriendDialog = (props) => {
	let id = props.id;
  let addFriendsToOriginal = props.addFriendsToOriginal;
  let setSnackbar = props.setSnackbar;
  const { onClose, selectedValue, open } = props;
  
	const [friends, setFriends] = useState([]);
	const [isLoaded, setisLoaded] = useState(false);
	const [toAddFriend, setToAddFriend] = useState({ id: null, name: '', lastName: '' });

  const profileService = new ProfileService();

  useEffect(() => {
    if(!isLoaded){
      profileService.possibleFriends(id)
      .then( friends => {
        setFriends(friends.data);
        setisLoaded(true);
      })  
      .catch( err => {
        setSnackbar({
          open: true,
          message: err,
          severity: 'error'
        });
      });
    }
  });

  const handleClose = () => {
    onClose(selectedValue);
  };
	
	const addFriend = () => {
		let idFriendToAdd = toAddFriend.id;
		if(idFriendToAdd !== null){
			profileService.addFriend(id, idFriendToAdd)
			.then( status => {
        setSnackbar({
          open: true,
          message: `Has agregado a ${toAddFriend.name} ${toAddFriend.lastName} a tu lista de amigos.`,
          severity: 'success'
        });
				addFriendsToOriginal(toAddFriend);
				setFriends(friends.filter(friend => friend !== toAddFriend));
				setToAddFriend({id: null});		
			})  
			.catch( err => {
        setSnackbar({
          open: true,
          message: err,
          severity: 'error'
        });
      });
		}
	}

  return (
		isLoaded ?
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Posibles amigos</DialogTitle>
        <GenericFriendsTable friends={friends} actionOnClick={setToAddFriend} />
        { toAddFriend.id === null ?  <Typography>Seleccione un amigo para agregar...</Typography> :  <Button color="primary" variant="contained" onClick={addFriend}>{ `Agregar a ${toAddFriend.name} ${toAddFriend.lastName}` }</Button> }
    </Dialog>
		:
		<Loader />
  );
}

AddFriendDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};