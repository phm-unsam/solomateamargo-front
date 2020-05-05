import React from 'react';
import MaterialTable from 'material-table'

export const GridFlights = (props) => {
  const { flights } = props;

  const getAvailableSeats = (e,flight) => {
    props.getSeats(flight)
  }
  return (
    <MaterialTable
      title="Vuelos"
      columns={[
        { title: "Origen", field: "destinationFrom" },
        { title: "Destino", field: "destinationTo" },
        { title: "Aerolineas", field: "airline" },
        { title: "Fecha de salida", field: "departure" },
        { title: "Escalas", field: "stopoversAmount" },
        { title: "Duracion (hs)", field: "flightDuration" },
        { title: "Desde", field: "priceFrom" },
      ]}
      data={flights}
      options={
        {
          search: false,
          paging: false,
        }
      }
      localization={
          {
            body: { emptyDataSourceMessage: "No hay vuelos disponibles" },
          }
        }
      onRowClick={getAvailableSeats}
    />
  )
}