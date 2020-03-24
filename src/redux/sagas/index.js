import { all } from 'redux-saga/effects';
import Login from './Login'
import Cart from './Cart'

export default function* rootSaga() {
	yield all([ Login(), Cart() ]);
}
