import {
    EXITO_CREAR_ORDEN,
	EXITO_MIS_ORDENES_CLIENTE,
	EXITO_MIS_ORDENES_VENDEDOR,
    FALLA_CREAR_ORDEN,
	FALLA_MIS_ORDENES_CLIENTE,
	FALLA_MIS_ORDENES_VENDEDOR,
    REINICIO_CREAR_ORDEN,
	REINICIO_MIS_ORDENES_CLIENTE,
	REINICIO_MIS_ORDENES_VENDEDOR,
    SOLICITUD_CREAR_ORDEN,
	SOLICITUD_MIS_ORDENES_CLIENTE,
	SOLICITUD_MIS_ORDENES_VENDEDOR,
	EXITO_EDITAR_ORDEN,
	FALLA_EDITAR_ORDEN,
	REINICIO_EDITAR_ORDEN,
	SOLICITUD_EDITAR_ORDEN
} from '../constantes/constantesOrdenes';

export const crearOrdenReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_CREAR_ORDEN:
			return { loading: true };
		case EXITO_CREAR_ORDEN:
			return { loading: false, exito: true, orden: action.payload };
		case FALLA_CREAR_ORDEN:
			return { loading: false, error: action.payload, exito: false};
		case REINICIO_CREAR_ORDEN:
			return {};
		default:
			return state;
	}
};

export const editarOrdenReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_EDITAR_ORDEN:
			return { loading: true };
		case EXITO_EDITAR_ORDEN:
			return { loading: false, exito: true};
		case FALLA_EDITAR_ORDEN:
			return { loading: false, error: action.payload, exito: false};
		case REINICIO_EDITAR_ORDEN:
			return {};
		default:
			return state;
	}
};

export const obtenerOrdenClienteReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_MIS_ORDENES_CLIENTE:
			return { loading: true };
		case EXITO_MIS_ORDENES_CLIENTE:
			return { loading: false, ordenes: action.payload };
		case FALLA_MIS_ORDENES_CLIENTE:
			return { loading: false, error: action.payload };
		case REINICIO_MIS_ORDENES_CLIENTE:
			return {};
		default:
			return state;
	}
};

export const obtenerOrdenVendedorReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_MIS_ORDENES_VENDEDOR:
			return { loading: true };
		case EXITO_MIS_ORDENES_VENDEDOR:
			return { loading: false, ordenes: action.payload };
		case FALLA_MIS_ORDENES_VENDEDOR:
			return { loading: false, error: action.payload };
		case REINICIO_MIS_ORDENES_VENDEDOR:
			return {};
		default:
			return state;
	}
};