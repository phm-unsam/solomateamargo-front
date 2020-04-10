import React from 'react';
import './App.css';
import Login from './components/login/login';
import Cart from './components/cart/cart'
import { Provider } from 'react-redux'
import Flights from './components/flights/flights';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './components/profile/profile';
import PrivateRoute from './privateRoute'
import Appbar from './components/appbar/appbar'

const App = ({ store }) => (
	<Provider store={store}>
		<Router>
			<div className="App">
				<Appbar />
				<PrivateRoute exact path="/perfil" component={Profile} />
				<Route exact path="/login" component={Login} />
				<PrivateRoute exact path="/cart" component={Cart} />
				<PrivateRoute exact path="/" component={Flights} />

			</div>
		</Router>
	</Provider>
);



App.propTypes = {
	store: PropTypes.object.isRequired
};


export default App;
