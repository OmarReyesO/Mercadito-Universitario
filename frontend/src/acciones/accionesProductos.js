import axios from 'axios';
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

export const obtenerProducto = (id) => async (dispatch) => {
  try {
    dispatch({ type: SOLICITUD_PRODUCTO })

    const { data } = await axios.get(`/api/productos/producto?id=${id}`)

    dispatch({
      type: EXITO_PRODUCTO,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FALLA_PRODUCTO,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
  
export const obtenerMisProductos = (id) => async (dispatch) => {
  try {
    dispatch({ type: SOLICITUD_MIS_PRODUCTOS })

    const { data } = await axios.get(`/api/productos/mis-productos?id=${id}`);

    dispatch({
      type: EXITO_MIS_PRODUCTOS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FALLA_MIS_PRODUCTOS,
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

    const {data} = await axios.post('/api/productos/', producto, config);

    dispatch({
      type: EXITO_CREAR_PRODUCTO,
      payload: data
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

export const reinciarProductoCreado = () => (dispatch) =>{
  dispatch({
    type: REINICIO_CREAR_PRODUCTO
  })
}

export const editarProducto = (producto) => async (dispatch) => {
  try {
    dispatch({ type: SOLICITUD_EDITAR_PRODUCTO })

    const config = {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		};

    const {data} = await axios.put('/api/productos/', producto, config);

    dispatch({
      type: EXITO_EDITAR_PRODUCTO,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FALLA_EDITAR_PRODUCTO,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const reinciarProductoEditado = () => (dispatch) =>{
  dispatch({
    type: REINICIO_EDITAR_PRODUCTO
  })
}