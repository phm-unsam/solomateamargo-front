import React, { Fragment }  from 'react';
import style from './style'
import TableCreator from '../tableCreator/TableCreator';

export const GenericFriendsTable = (props) => {
    const classes = style();

    let friends = props.friends;
    let actionOnClick = props.actionOnClick;
  
    const columnNames = [
      { name: 'Nombre'}, {  name: 'Apellido'}
    ] 

    return (
      <Fragment> 
          <TableCreator spacing={3} data={friends} columnName={columnNames} bodyAction={actionOnClick} styles={classes.table} noDataMsg={"No tiene amigos ..."}> </TableCreator>
      </Fragment>
    )    
}