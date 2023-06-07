import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './Reducer'
import thunkMiddleware from 'redux-thunk'

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhanser(applyMiddleware(thunkMiddleware))
);

export default store;