import React from 'react';
import './App.css';
import Login from './components/login';
import Cart from './components/cart'
import { Provider } from 'react-redux'
import Flights from './components/flights';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './components/profile';




const App = ({ store }) => (
	<Provider store={store}>
		<Router>
			<div className="App">
				<Route exact path="/" component={Login} />
				<Route exact path="/carrito" component={Cart} />
				<Route exact path="/vuelos" component={Flights} />
				<Route exact path="/perfil/:id" component={Profile} />
			</div>
		</Router>
	</Provider>
);



App.propTypes = {
	store: PropTypes.object.isRequired
};


export default App;
