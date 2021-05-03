import mongoose from 'mongoose'

const EsquemaResena = mongoose.Schema(
  {
    nombre: { type: String, required: true },
    calificacion: { type: Number, required: true },
    comentario: { type: String, required: true },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
  },
  {
    timestamps: true,
  }
)

const EsquemaProducto = mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    nombre: {
      type: String,
      required: true,
    },

    descripcion: {
      type: String,
      required: true,
    },

    imagenes: [],

    precio: {
      type: Number,
      required: true,
      default: 0,
    },

    categoria: {
      type: String,
      required: true,
    },

    cantidadStock: {
        type: Number,
        required: true,
        default: 0,
    },

    resenas: [EsquemaResena],

    calificacionGlobal: {
      type: Number,
      required: true,
      default: 0,
    },

    numResenas: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
)

const Producto = mongoose.model('Producto', EsquemaProducto);

export default Producto;