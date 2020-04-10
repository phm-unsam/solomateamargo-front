import React, { Fragment } from 'react';

import TableCreator from '../tableCreator/tableCreator'

export const GridFlights = (props) => {
    const { flights } = props;
  
    const columnName = [
      { name: 'Origen'}, {name: 'Destino'}, {name: 'Aerolinea'}, {name: 'Duración'},{name: 'Salida'}, {name:'Desde'}, {name: 'Escalas'}
    ] 

    const selectSeat = (flight) =>{
      props.getAllSeats(flight.id)
    }
    return (
      <Fragment>
        <TableCreator data={flights} columnName={columnName} bodyAction={selectSeat} noDataMsg={"No hay vuelos disponibles"}/>
      </Fragment>
    )
  }