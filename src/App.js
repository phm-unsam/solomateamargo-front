import React from 'react';
import './App.css';
import Login from './components/login';
import Cart from './components/cart'
import { Provider } from 'react-redux'
import Flights from './components/flights';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './components/profile';
import PrivateRoute from './privateRoute'




const App = ({ store }) => (
	<Provider store={store}>

		<Router>
			<div className="App">
				<PrivateRoute exact path="/perfil" component={Profile} />
				{/* <Route exact path="/login" component={Login} /> */}
				<Route path="/" component={Flights}/>
				<PrivateRoute exact path="/cart" component={Cart} />

			</div>
		</Router>
	</Provider>
);



App.propTypes = {
	store: PropTypes.object.isRequired
};


export default App;
