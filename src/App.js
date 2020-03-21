import React from 'react';
import './App.css';
import Login from './components/Login';
import Cart from './components/Cart'
import { Provider } from 'react-redux'
import store from './redux/store'
import Flights from './components/Flights';
import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Route exact path="/" component={Login} />
					<Route exact path="/cart" component={Cart} />
					<Route exact path="/vuelos" component={Flights} />
				</div>
			</Router>
		</Provider>
	);

}

export default App;
