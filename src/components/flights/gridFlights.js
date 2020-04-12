import React from 'react';
import MaterialTable from 'material-table'

export const GridFlights = (props) => {
<<<<<<< HEAD
  const { flights } = props;
=======
    const { flights } = props;
  
    const columnName = [
      { name: 'Origen'}, {name: 'Destino'}, {name: 'Aerolinea'}, {name: 'Duración'},{name: 'Salida'}, {name:'Desde'}, {name: 'Escalas'}, { name: 'Accion' }
    ] 
>>>>>>> 83d4bb3f5917ba7573c9ddf72318d4c188207b95

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