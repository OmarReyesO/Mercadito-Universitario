import {
	SOLICITUD_PRODUCTOS,
	SOLICITUD_CREAR_PRODUCTO,
    EXITO_PRODUCTOS,
	EXITO_CREAR_PRODUCTO,
    FALLA_PRODUCTOS,
	FALLA_CREAR_PRODUCTO,
    REINICIO_PRODUCTOS,
	REINICIO_CREAR_PRODUCTO
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

export const crearProductoReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_CREAR_PRODUCTO:
			return { loading: true };
		case EXITO_CREAR_PRODUCTO:
			return { loading: false, exito: true };
		case FALLA_CREAR_PRODUCTO:
			return { loading: false, error: action.payload, exito: false };
		case REINICIO_CREAR_PRODUCTO:
			return {};
		default:
			return state;
	}
};
