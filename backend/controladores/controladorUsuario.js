import asyncHandler from 'express-async-handler';
import generarToken from '../utils/generarToken.js';
import Usuario from '../modelos/ModeloUsuario.js';

//@desc		Autoriza al usuario y obtiene token
//@route	POST /api/usuarios/login
//@access   Público
const authUsuario = asyncHandler(async (req, res) => {
	const { correo, contrasena } = req.body;
	const usuario = await Usuario.findOne({ correo });
	if (usuario && (await usuario.verificarContrasena(contrasena))) {
		res.json({
			_id: usuario._id,
			nombre:usuario.nombre,
			apellido:usuario.apellido,
			correo:usuario.correo,
			campus:usuario.campus,
			vendedor:usuario.vendedor,
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
	const { nombre, apellido, correo, contrasena, campus, vendedor} = req.body;

	const usuarioExiste = await Usuario.findOne({ correo });

	if (usuarioExiste) {
		res.status(400);
		throw new Error('Usuario ya existente');
	}

	const usuario = await Usuario.create({
		nombre,
		apellido,
		correo,
		contrasena,
		campus,
		vendedor
	});

	if (usuario) {
		res.status(201).json({
			_id: usuario._id,
			nombre:usuario.nombre,
			apellido:usuario.apellido,
			correo:usuario.correo,
			campus:usuario.campus,
			vendedor:usuario.vendedor,
			token: generarToken(usuario._id),
		});
	} else {
		res.status(400);
		throw new Error('Datos de usuario inválidos.');
	}
});

export { authUsuario, registrarUsuario };
