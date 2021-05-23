import express from 'express';
const router = express.Router();
import {
	registrarUsuario,
	authUsuario,
	obtenerVendedor,
	obtenerCliente
} from '../controladores/controladorUsuario.js';

router.post('/registrar',registrarUsuario);

router.post('/login', authUsuario);

router.route('/cliente').get(obtenerCliente);

router.route('/vendedor').get(obtenerVendedor);

export default router;
