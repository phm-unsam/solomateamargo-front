import React from 'react';
import MaterialTable from 'material-table'

export const GridFlights = (props) => {
  const { flights } = props;

  const getAvailableSeats = (e,flight) => {
    props.getAllSeats(flight)
  }
  return (
    <MaterialTable
      title="Vuelos"
      columns={[
        { title: "Origen", field: "from" },
        { title: "Destino", field: "to" },
        { title: "Aerolineas", field: "airline" },
        { title: "Salida", field: "departure" },
        { title: "Escalas", field: "stopoversAmount" },
        { title: "Duracion", field: "flightDuration" },
        { title: "Precio", field: "priceFrom" },
      ]}
      data={flights}
      options={
        {
          search: false,
          paging: false,
        }
      }
      onRowClick={getAvailableSeats}
    />
  )
}