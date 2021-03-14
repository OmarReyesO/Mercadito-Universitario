import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Usuario from '../modelos/ModeloUsuario.js';

const proteger = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.usuario = await Usuario.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Acceso no autorizado, token inválido.');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Acceso no autorizado, no token.');
	}
});

export { proteger };
