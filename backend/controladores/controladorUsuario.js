import asyncHandler from 'express-async-handler';
import generarToken from '../utils/generarToken.js';
import Usuario from '../modelos/ModeloUsuario.js';

//@desc		Autoriza al usuario y obtiene token
//@route	POST /api/usuarios/login
//@access   Público
const authUsuario = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const usuario = await Usuario.findOne({ email });
	if (usuario && (await usuario.verificarContrasena(password))) {
		res.json({
			_id: usuario._id,
			name: usuario.name,
			lastName: usuario.lastName,
			email: usuario.email,
			country: usuario.country,
			phone: usuario.phone,
			token: generarToken(usuario._id),
		});
	} else {
		res.status(401);
		throw new Error('Correo o contraseña inválidos.');
	}
});

//@desc		Registra un nuevo usuario
//@ruta		POST /api/usuarios/
//@acceso	Privado/Admin
const registrarUsuario = asyncHandler(async (req, res) => {
	const { email, password, name, lastName, country, phone } = req.body;

	const usuarioExiste = await Usuario.findOne({ email });

	if (usuarioExiste) {
		res.status(400);
		throw new Error('Usuario ya existente');
	}

	const usuario = await Usuario.create({
		email,
		password,
		name,
		lastName,
		country,
		phone,
	});

	if (usuario) {
		res.status(201).json({
			_id: usuario._id,
			email: usuario.email,
			name: usuario.name,
			lastName: usuario.lastName,
			country: usuario.country,
			phone: usuario.phone,
			password: usuario.password,
		});
	} else {
		res.status(400);
		throw new Error('Datos de usuario inválidos.');
	}
});

export { authUsuario, registrarUsuario };
