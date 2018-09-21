import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
//import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import customersReducer from './reducers/customers';
import createSagaMiddleware from 'redux-saga';
import {watchCustomers, watchAuth} from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    auth: authReducer,
    customers: customersReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchCustomers);

export default store;