import express from 'express';
const router = express.Router();
import {
	registrarUsuario,
	authUsuario,
} from '../controladores/controladorUsuario.js';

router.post('/registrar',registrarUsuario);

router.post('/login', authUsuario);

export default router;
