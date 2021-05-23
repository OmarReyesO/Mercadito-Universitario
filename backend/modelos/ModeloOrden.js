import mongoose from 'mongoose'


const EsquemaOrden = mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },

    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario',
      },

    estatus: {
      type: String,
      required: true,
    },

    nombreVendedor:{
      type:String,
      required: true
    },

    nombreCliente:{
      type:String,
      required: true
    },
    
    productos:[]
  },
  {
    timestamps: true,
  }
)

const Orden = mongoose.model('Orden', EsquemaOrden);

export default Orden;