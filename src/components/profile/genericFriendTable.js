import React, { Fragment }  from 'react';
import style from './style'
import TableCreator from '../tableCreator/tableCreator';

export const GenericFriendsTable = (props) => {
    const classes = style();

    let friends = props.friends;
    let actionOnClick = props.actionOnClick;
    let noDataMsg = props.noDataMsg;
    let titleButton = props.titleButton;
  
    const columnNames = [
      { name: 'Nombre'}, {  name: 'Apellido'}
    ] 

    return (
      <Fragment> 
          <TableCreator spacing={3} data={friends} columnName={columnNames} buttonAction={actionOnClick} styles={classes.table} noDataMsg={noDataMsg} titleButton={titleButton}> </TableCreator>
      </Fragment>
    )    
}