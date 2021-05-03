import express from 'express'
const router = express.Router()
import {obtenerProductos, crearProducto, obtenerMisProductos} from '../controladores/controladorProducto.js';

router.route('/').get(obtenerProductos).post(crearProducto);

router.route('/mis-productos').get(obtenerMisProductos);

export default router;