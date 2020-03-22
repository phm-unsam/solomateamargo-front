import { createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import rootSaga from './sagas'

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	return {
		...createStore(reducer, applyMiddleware(sagaMiddleware)),
		runSaga: sagaMiddleware.run(rootSaga)
	};
};

export default configureStore