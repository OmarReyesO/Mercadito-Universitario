import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const EsquemaUsuario = mongoose.Schema(
	{
		correo: {
			type: String,
			required: true,
			unique: true,
		},

		contrasena: {
			type: String,
			required: true,
		},

		nombre: {
			type: String,
			required: true,
		},

		apellido: {
			type: String,
			required: true,
		},

		campus:{
			type:String,
			required:true
		},

		foto:{
			type: String, 
		},

		vendedor:{
			type: Boolean
		},

		horario:[
			{
				lunes: {type: String},
				martes: {type: String},
				miercoles: {type: String},
				jueves: {type: String},
				viernes: {type: String},
			}
		],

		productos:[],

		ordenes:[],

	},
	{
		timestamps: true,
	}
);

EsquemaUsuario.methods.verificarContrasena = async function (
	contrasenaIngresada
) {
	return bcrypt.compare(contrasenaIngresada, this.contrasena);
};

EsquemaUsuario.pre('save', async function (next) {
	if (!this.isModified('contrasena')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.contrasena = await bcrypt.hash(this.contrasena, salt);
});

const Usuario = mongoose.model('Usuario', EsquemaUsuario);

export default Usuario;
