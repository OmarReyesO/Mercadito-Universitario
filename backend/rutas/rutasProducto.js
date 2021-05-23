import express from 'express'
const router = express.Router()
import {obtenerProductos, crearProducto, obtenerMisProductos, obtenerProducto, editarProducto} from '../controladores/controladorProducto.js';

router.route('/').get(obtenerProductos).post(crearProducto).put(editarProducto);

router.route('/mis-productos').get(obtenerMisProductos);

router.route('/producto').get(obtenerProducto);
export default router;