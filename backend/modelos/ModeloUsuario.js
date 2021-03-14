import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const EsquemaUsuario = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},

		name: {
			type: String,
			required: true,
		},

		lastName: {
			type: String,
			required: true,
		},

		country: {
			type: String,
			required: true,
		},

		phone: {
			type: String,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

EsquemaUsuario.methods.verificarContrasena = async function (
	contrasenaIngresada
) {
	return bcrypt.compare(contrasenaIngresada, this.password);
};

EsquemaUsuario.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const Usuario = mongoose.model('Usuario', EsquemaUsuario);

export default Usuario;
