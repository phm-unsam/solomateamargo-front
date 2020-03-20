import React from 'react';
import './App.css';
import Login from './components/Login';
import Cart from './components/Cart'
import { Provider } from 'react-redux'
import store from './redux/store'
import Flights from './components/Flights';
function App() {
  return (
	<Provider store={store}>
	<div className="App">
		{/* <Login></Login> */}		
		{ <Cart />}
		{/* <Flights /> */}
	</div>
	</Provider>
  );

}

export default App;
