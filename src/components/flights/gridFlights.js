import React, { Fragment } from 'react';

import TableCreator from '../tableCreator/TableCreator'

export const GridFlights = (props) => {
    const { flights } = props;
  
    const columnName = [
      { name: 'origen'}, {  name: 'destino'} , {  name: 'aerolinea'}  , {  name: 'Salida'}  , {  name: 'Escala'}  , {  name: 'Duracion'} , {  name:'Desde'}
    ] 

    const selectSeat = (flight) =>{
      props.getAllSeats(flight.id)
    }
    return (
      <Fragment>
        <TableCreator data={flights} columnName={columnName} bodyAction={selectSeat}/>
      </Fragment>
    )
  }