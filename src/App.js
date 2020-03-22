import React from 'react';
import './App.css';
import Login from './components/login';
import Cart from './components/cart'
import { Provider } from 'react-redux'
import Flights from './components/flights';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';


const App = ({ store }) => (
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



App.propTypes = {
	store: PropTypes.object.isRequired
};


export default App;
