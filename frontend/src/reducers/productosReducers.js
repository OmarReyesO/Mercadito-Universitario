import {
	SOLICITUD_PRODUCTOS,
	SOLICITUD_CREAR_PRODUCTO,
	SOLICITUD_MIS_PRODUCTOS,
	SOLICITUD_PRODUCTO,
	SOLICITUD_EDITAR_PRODUCTO,
    EXITO_PRODUCTOS,
	EXITO_CREAR_PRODUCTO,
	EXITO_MIS_PRODUCTOS,
	EXITO_PRODUCTO,
	EXITO_EDITAR_PRODUCTO,
    FALLA_PRODUCTOS,
	FALLA_CREAR_PRODUCTO,
	FALLA_MIS_PRODUCTOS,
	FALLA_PRODUCTO,
	FALLA_EDITAR_PRODUCTO,
    REINICIO_PRODUCTOS,
	REINICIO_CREAR_PRODUCTO,
	REINICIO_MIS_PRODUCTOS,
	REINICIO_PRODUCTO,
	REINICIO_EDITAR_PRODUCTO
} from '../constantes/constantesProductos';

export const listaProductosReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_PRODUCTOS:
			return { loading: true };
		case EXITO_PRODUCTOS:
			return { loading: false, productos: action.payload };
		case FALLA_PRODUCTOS:
			return { loading: false, error: action.payload };
		case REINICIO_PRODUCTOS:
			return {};
		default:
			return state;
	}
};

export const listaMisProductosReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_MIS_PRODUCTOS:
			return { loading: true };
		case EXITO_MIS_PRODUCTOS:
			return { loading: false, productos: action.payload };
		case FALLA_MIS_PRODUCTOS:
			return { loading: false, error: action.payload };
		case REINICIO_MIS_PRODUCTOS:
			return {};
		default:
			return state;
	}
};

export const crearProductoReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_CREAR_PRODUCTO:
			return { loading: true };
		case EXITO_CREAR_PRODUCTO:
			return { loading: false, exito: true, producto: action.payload };
		case FALLA_CREAR_PRODUCTO:
			return { loading: false, error: action.payload, exito: false};
		case REINICIO_CREAR_PRODUCTO:
			return {};
		default:
			return state;
	}
};

export const obtenerProductoReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_PRODUCTO:
			return { loading: true };
		case EXITO_PRODUCTO:
			return { loading: false, producto: action.payload };
		case FALLA_PRODUCTO:
			return { loading: false, error: action.payload };
		case REINICIO_PRODUCTO:
			return {};
		default:
			return state;
	}
};

export const editarProductoReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_EDITAR_PRODUCTO:
			return { loading: true };
		case EXITO_EDITAR_PRODUCTO:
			return { loading: false, exito: true, producto: action.payload };
		case FALLA_EDITAR_PRODUCTO:
			return { loading: false, error: action.payload, exito: false};
		case REINICIO_EDITAR_PRODUCTO:
			return {};
		default:
			return state;
	}
};