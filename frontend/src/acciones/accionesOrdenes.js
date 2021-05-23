import axios from 'axios';
import {
    EXITO_CREAR_ORDEN,
    EXITO_MIS_ORDENES_CLIENTE,
    FALLA_CREAR_ORDEN,
    FALLA_MIS_ORDENES_CLIENTE,
    REINICIO_CREAR_ORDEN,
    REINICIO_MIS_ORDENES_CLIENTE,
    SOLICITUD_CREAR_ORDEN,
    SOLICITUD_MIS_ORDENES_CLIENTE,
    EXITO_MIS_ORDENES_VENDEDOR,
    FALLA_MIS_ORDENES_VENDEDOR,
    REINICIO_MIS_ORDENES_VENDEDOR,
    SOLICITUD_MIS_ORDENES_VENDEDOR,
    EXITO_EDITAR_ORDEN,
    FALLA_EDITAR_ORDEN,
    REINICIO_EDITAR_ORDEN,
    SOLICITUD_EDITAR_ORDEN
} from '../constantes/constantesOrdenes';

export const crearOrden = (orden) => async (dispatch) => {
    try {
      dispatch({ type: SOLICITUD_CREAR_ORDEN })
  
      const config = {
              'Content-Type': 'application/json',
              Accept: 'application/json'
          };
  
      const {data} = await axios.post('/api/ordenes/', orden, config);
  
      dispatch({
        type: EXITO_CREAR_ORDEN,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: FALLA_CREAR_ORDEN,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const editarOrden = (orden) => async (dispatch) => {
    try {
      dispatch({ type: SOLICITUD_EDITAR_ORDEN })
  
      const config = {
              'Content-Type': 'application/json',
              Accept: 'application/json'
          };
  
      const {data} = await axios.put('/api/ordenes/', orden, config);
  
      dispatch({
        type: EXITO_EDITAR_ORDEN,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: FALLA_EDITAR_ORDEN,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const reiniciarOrdenCreada = () => (dispatch) =>{
    dispatch({
      type: REINICIO_EDITAR_ORDEN
    })
  }

    
export const obtenerMisOrdenesCliente = (id) => async (dispatch) => {
  try {
    dispatch({ type:  SOLICITUD_MIS_ORDENES_CLIENTE})

    const { data } = await axios.get(`/api/ordenes/cliente?id=${id}`, );

    dispatch({
      type: EXITO_MIS_ORDENES_CLIENTE,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FALLA_MIS_ORDENES_CLIENTE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
    
export const obtenerMisOrdenesVendedor= (id) => async (dispatch) => {
  try {
    dispatch({ type:  SOLICITUD_MIS_ORDENES_VENDEDOR})

    const { data } = await axios.get(`/api/ordenes/vendedor?id=${id}`, );

    dispatch({
      type: EXITO_MIS_ORDENES_VENDEDOR,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FALLA_MIS_ORDENES_VENDEDOR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}