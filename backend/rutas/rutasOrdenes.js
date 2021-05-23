import express from 'express'
const router = express.Router()
import {crearOrden,editarOrden,obtenerOrden,obtenerOrdenes,obtenerMisOrdenesCliente,obtenerMisOrdenesVendedor} from '../controladores/controladorOrdenes.js';

router.route('/').get(obtenerOrdenes).post(crearOrden).put(editarOrden);

router.route('/vendedor').get(obtenerMisOrdenesVendedor);

router.route('/cliente').get(obtenerMisOrdenesCliente);

export default router;