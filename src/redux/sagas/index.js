import { all } from 'redux-saga/effects';
import Login from './Login'
import Cart from './Cart'
import FlightSearch from './FlightSearch'
export default function* rootSaga() {
	yield all([ Login(), Cart(), FlightSearch() ]);
}
