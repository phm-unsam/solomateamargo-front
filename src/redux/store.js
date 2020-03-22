import { createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers'
import rootSaga from './sagas'

//Added composeWithDevTools to check the global state with redux dev tool extension
const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	return {
		...createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware))),
		runSaga: sagaMiddleware.run(rootSaga)
	};
};

export default configureStore