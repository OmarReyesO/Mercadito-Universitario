import axios from 'axios';
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

export const obtenerListaProductos = (categoria = '') => async (dispatch) => {
    try {
      dispatch({ type: SOLICITUD_PRODUCTOS })

      const { data } = await axios.get(categoria === '' ? `/api/productos/` : `/api/productos/?categoria=${categoria}`)
  
      dispatch({
        type: EXITO_PRODUCTOS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: FALLA_PRODUCTOS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const crearProducto = (producto) => async (dispatch) => {
  try {
    dispatch({ type: SOLICITUD_CREAR_PRODUCTO })

    const config = {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		};

    await axios.post('/api/productos/', producto, config);

    dispatch({
      type: EXITO_CREAR_PRODUCTO,
    })
  } catch (error) {
    dispatch({
      type: FALLA_CREAR_PRODUCTO,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}