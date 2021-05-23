import axios from 'axios';
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
	REINICIO_OBTENER_CLIENTE,
	REINICIO_OBTENER_VENDEDOR,
	SOLICITUD_OBTENER_VENDEDOR,
	SOLICITUD_OBTENER_CLIENTE
} from '../constantes/constantesUsuario';

export const login = (correo, contrasena) => async (dispatch) => {
	try {
		dispatch({
			type: SOLICITUD_USUARIO_LOGIN,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/usuarios/login',
			{ correo, contrasena },
			config
		);

		dispatch({
			type: EXITO_USUARIO_LOGIN,
			payload: data,
		});

		localStorage.setItem('infoUsuario', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: FALLA_USUARIO_LOGIN,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('infoUsuario');
	dispatch({
		type: LOGOUT_USUARIO,
	});
	document.location.href = '/login';
};

export const registrarUsuario = (usuario) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SOLICITUD_USUARIO_REGISTRO,
		});

		const config = {
			'Content-Type': 'application/json',
		};

		const { data } = await axios.post('/api/usuarios/registrar/', usuario, config);

		dispatch({
			type: EXITO_USUARIO_REGISTRO,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: FALLA_USUARIO_REGISTRO,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const reinicioRegistroUsuario = () => (dispatch) => {
	dispatch({
		type: REINICIO_USUARIO_REGISTRO,
	});
};

export const obtenerCliente = (id) => async (dispatch) => {
	try {
	  dispatch({ type: SOLICITUD_OBTENER_CLIENTE })
  
	  const { data } = await axios.get(`/api/usuarios/cliente?id=${id}`)
  
	  dispatch({
		type: EXITO_OBTENER_CLIENTE,
		payload: data,
	  })
	} catch (error) {
	  dispatch({
		type: FALLA_OBTENER_CLIENTE,
		payload:
		  error.response && error.response.data.message
			? error.response.data.message
			: error.message,
	  })
	}
  }

export const obtenerVendedor = (id) => async (dispatch) => {
	try {
	  dispatch({ type: SOLICITUD_OBTENER_VENDEDOR })
  
	  const { data } = await axios.get(`/api/usuarios/vendedor?id=${id}`)
  
	  dispatch({
		type: EXITO_OBTENER_VENDEDOR,
		payload: data,
	  })
	} catch (error) {
	  dispatch({
		type: FALLA_OBTENER_VENDEDOR,
		payload:
		  error.response && error.response.data.message
			? error.response.data.message
			: error.message,
	  })
	}
  }