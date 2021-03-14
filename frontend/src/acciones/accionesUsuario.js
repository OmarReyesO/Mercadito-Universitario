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
} from '../constantes/constantesUsuario';

export const login = (email, password) => async (dispatch) => {
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
			{ email, password },
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

		const { data } = await axios.post('/api/usuarios/', usuario, config);

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
