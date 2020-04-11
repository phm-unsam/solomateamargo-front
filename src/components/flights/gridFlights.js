import React, { Fragment } from 'react';

import TableCreator from '../tableCreator/tableCreator'

export const GridFlights = (props) => {
    const { flights } = props;
  
    const columnName = [
      { name: 'Origen'}, {name: 'Destino'}, {name: 'Aerolinea'}, {name: 'Duración'},{name: 'Salida'}, {name:'Desde'}, {name: 'Escalas'}
    ] 

    const availableSeats = (flight) => {
      props.getAllSeats(flight)
    }
    return (
      <Fragment>
        <TableCreator data={flights} columnName={columnName} noDataMsg={"No hay vuelos disponibles"} buttonAction={availableSeats} titleButton="Seleccionar"/>
      </Fragment>
    )
  }