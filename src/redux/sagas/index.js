import { all } from 'redux-saga/effects';
import Login from './Login'


export default function* rootSaga() {
	yield all([ Login() ]);
}
