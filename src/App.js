import React from 'react';
import './App.css';
import Login from './components/Login';
import CarritoDeCompras from './components/CarritoDeCompras'
import { Provider } from 'react-redux'
import store from './store'
function App() {
  return (
	<Provider store={store}>
	<div className="App">
		{/* <Login></Login> */}
		<CarritoDeCompras />
	</div>
	</Provider>
  );

}

export default App;
