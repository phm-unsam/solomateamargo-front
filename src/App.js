import React from 'react';
import './App.css';
import Login from './components/login/Login';
import Cart from './components/cart/Cart'
import { Provider } from 'react-redux'
import Flights from './components/flights/Flights';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './components/profile/Profile';
import PrivateRoute from './privateRoute'


const App = ({ store }) => (
	<Provider store={store}>

		<Router>
			<div className="App">
				<PrivateRoute exact path="/perfil" component={Profile} />
				<Route exact path="/login" component={Login} />
				<PrivateRoute exact path="/cart" component={Cart} /> 
				<PrivateRoute exact path="/" component={Flights}/>
				
			</div>
		</Router>
	</Provider>
);



App.propTypes = {
	store: PropTypes.object.isRequired
};


export default App;
