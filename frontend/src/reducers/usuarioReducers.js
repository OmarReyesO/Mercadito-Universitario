import {
	SOLICITUD_USUARIO_LOGIN,
	EXITO_USUARIO_LOGIN,
	FALLA_USUARIO_LOGIN,
	LOGOUT_USUARIO,
	SOLICITUD_USUARIO_REGISTRO,
	EXITO_USUARIO_REGISTRO,
	FALLA_USUARIO_REGISTRO,
	REINICIO_USUARIO_REGISTRO,
	EXITO_OBTENER_CLIENTE,
	EXITO_OBTENER_VENDEDOR,
	FALLA_OBTENER_CLIENTE,
	FALLA_OBTENER_VENDEDOR,
	SOLICITUD_OBTENER_CLIENTE,
	SOLICITUD_OBTENER_VENDEDOR,
	REINICIO_OBTENER_CLIENTE,
	REINICIO_OBTENER_VENDEDOR
} from '../constantes/constantesUsuario';

export const usuarioLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_USUARIO_LOGIN:
			return { loading: true };
		case EXITO_USUARIO_LOGIN:
			return { loading: false, infoUsuario: action.payload };
		case FALLA_USUARIO_LOGIN:
			return { loading: false, error: action.payload };
		case LOGOUT_USUARIO:
			return {};
		default:
			return state;
	}
};

export const registrarUsuarioReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_USUARIO_REGISTRO:
			return { loading: true };
		case EXITO_USUARIO_REGISTRO:
			return { loading: false, usuario: action.payload, exito: true };
		case FALLA_USUARIO_REGISTRO:
			return { loading: false, error: action.payload, exito: false };
		case REINICIO_USUARIO_REGISTRO:
			return {};
		default:
			return state;
	}
};

export const obtenerClienteReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_OBTENER_CLIENTE:
			return { loading: true };
		case EXITO_OBTENER_CLIENTE:
			return { loading: false, perfilCliente: action.payload };
		case FALLA_OBTENER_CLIENTE:
			return { loading: false, error: action.payload };
		case REINICIO_OBTENER_CLIENTE:
			return {};
		default:
			return state;
	}
};

export const obtenerVendedorReducer = (state = {}, action) => {
	switch (action.type) {
		case SOLICITUD_OBTENER_VENDEDOR:
			return { loading: true };
		case EXITO_OBTENER_VENDEDOR:
			return { loading: false, perfilVendedor: action.payload };
		case FALLA_OBTENER_VENDEDOR:
			return { loading: false, error: action.payload };
		case REINICIO_OBTENER_VENDEDOR:
			return {};
		default:
			return state;
	}
};