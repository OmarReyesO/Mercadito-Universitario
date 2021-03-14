import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	usuarioLoginReducer,
	registrarUsuarioReducer,
} from './reducers/usuarioReducers';

const reducer = combineReducers({
	usuarioLogin: usuarioLoginReducer,
	registrarUsuario: registrarUsuarioReducer,
});

const infoUsuarioFromStorage = localStorage.getItem('infoUsuario')
	? JSON.parse(localStorage.getItem('infoUsuario'))
	: null;

const initialState = { usuarioLogin: { infoUsuario: infoUsuarioFromStorage } };

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
