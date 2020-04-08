import React  from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import style from './style'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


export const GenericFriendsTable = (props) => {
    const classes = style();
    let friends = props.friends;
    let actionOnClick = props.actionOnClick;
  
  
    return (
      <TableContainer spacing={3}>
        <Table className={classes.table} spacing={3}>
            <TableHead>
            <TableRow>
                <StyledTableCell align="center">Nombre</StyledTableCell>
                <StyledTableCell align="center">Apellido</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {friends.map(friend => (
                <TableRow key={friend.id} hover onClick={() => actionOnClick(friend)}>
                    <TableCell align="center" component="th" scope="row">{friend.name}</TableCell>
                    <TableCell align="center">{friend.lastName}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer>
    )
  }