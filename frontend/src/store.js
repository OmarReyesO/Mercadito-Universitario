import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	usuarioLoginReducer,
	registrarUsuarioReducer,
	obtenerClienteReducer,
	obtenerVendedorReducer
} from './reducers/usuarioReducers';

import {
	listaProductosReducer,
	crearProductoReducer,
	listaMisProductosReducer,
	obtenerProductoReducer,
	editarProductoReducer
} from './reducers/productosReducers';

import {crearOrdenReducer, obtenerOrdenClienteReducer, obtenerOrdenVendedorReducer, editarOrdenReducer} from './reducers/ordenesReducer';

const reducer = combineReducers({
	usuarioLogin: usuarioLoginReducer,
	registrarUsuario: registrarUsuarioReducer,
	cliente:obtenerClienteReducer,
	vendedor:obtenerVendedorReducer,
	listaProductos: listaProductosReducer,
	listaMisProductos:listaMisProductosReducer,
	productoCreado:crearProductoReducer,
	productoEditado:editarProductoReducer,
	productoObtenido:obtenerProductoReducer,
	ordenCreada: crearOrdenReducer,
	ordenEditada:editarOrdenReducer,
	misOrdenesCliente:obtenerOrdenClienteReducer,
	misOrdenesVendedor: obtenerOrdenVendedorReducer,

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
