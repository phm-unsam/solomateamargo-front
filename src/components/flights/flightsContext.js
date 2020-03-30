import React, {useState, useEffect} from 'react';
import FlightsService from '../../services/flights';
let FlightsContext = React.createContext()
let {Provider, Consumer} = FlightsContext

function FlightsProvider({children}){
    const flightsService = new FlightsService();
    const [addCartMgj, setAddCartMgj] = useState(false)
    let [flights, setFlights] = useState([])
    let [seats, setSeats] = useState([])
    let [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null)
    const [flightID, setFlightID] = useState(null);
    const selectFlight = flightId => {
        setFlightID(flightId)
        getSeats(flightId, null)
      }
    
    
    
      const getSeats = (flightID, checkedWindow) => {
        flightsService.getSeats(flightID, checkedWindow)
          .then(seat => {
            setSeats(seat)
          }).catch(err => setError(err))
      }

    useEffect(() => {
        if (!isLoaded) {
            const filterFromAndTo = {
              departure: '',
              arrival: '',
              datefrom: new Date(), 
              dateTo: new Date()
            }
            flightsService.getFlight(filterFromAndTo)
              .then(flight => {
                setFlights(flight)
                setIsLoaded(true);
              }).catch(err =>
                 setError(err))
          }
    },[])

    const selectFlightContext = filterDate => {
        
        flightsService.getFlight(filterDate)
          .then(flight => (
            setFlights(flight)
          ))
    
        // props.onFlightChange(flightSearch);
      }

    const addCartContext = (flight) =>{
        flightsService.postaddCart(flight).then(flight => {
            if (flight.status !== 200) {
              setError(true)
            }
            else {
              setAddCartMgj(true)
            }
          }
          )
    }
    return(
        <Provider value={{flights, selectFlight, seats, error, setError, selectFlightContext, addCartContext, flightID, addCartMgj}}>
            {children}
        </Provider>
    )
}

export {FlightsProvider, Consumer as FlightsConsumer, FlightsContext }