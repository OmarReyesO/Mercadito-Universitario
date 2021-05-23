import asyncHandler from 'express-async-handler';
import Orden from '../modelos/ModeloOrden.js';

// @desc    Obtiene todas las ordenes por estatus
// @route   GET /api/ordenes
// @access  Publico
const obtenerOrdenes = asyncHandler(async (req, res) => {

    let ordenes = {};

    if(req.query.estatus){
        const queries = {
            estatus: req.query.estatus
        }

        ordenes = await Orden.find({...queries});
    }else{
        ordenes = await Orden.find({});
    }
    
    if(ordenes){
        res.json(ordenes)
    }else{
        throw new Error('Ordenes no encontradas');
    }
})

// @desc    Obtiene una orden por ID
// @route   GET /api/productos/producto
// @access  Privado
const obtenerOrden = asyncHandler(async (req, res) => {
    const orden = await Orden.findById(req.query.id);
    
    if(orden){
        res.json(orden)
    }else{
        throw new Error('Productos no encontrados');
    }
})

// @desc    Obtiene todos los productos de un usuario
// @route   GET /api/productos
// @access  Privado
const obtenerMisOrdenesCliente = asyncHandler(async (req, res) => {

    const id = req.query.id;

    const ordenes = await Orden.find({cliente:id});
    
    if(ordenes){
        res.json(ordenes)
    }else{
        throw new Error('Orden no encontrada');
    }
})

// @desc    Obtiene todos los productos de un usuario
// @route   GET /api/productos
// @access  Privado
const obtenerMisOrdenesVendedor = asyncHandler(async (req, res) => {

    const id = req.query.id;

    const ordenes = await Orden.find({vendedor:id});
    
    if(ordenes){
        res.json(ordenes)
    }else{
        throw new Error('Orden no encontrada');
    }
})


// @desc    Crea una orden
// @route   POST /api/orden
// @access  Privado
const crearOrden = asyncHandler(async (req, res) => {
    const 
    {
        cliente,
        vendedor,
        estatus,
        productos,
        nombreVendedor,
        nombreCliente
    } = req.body;

    const orden = await Orden.create({
        cliente,
        vendedor,
        estatus,
        productos,
        nombreVendedor,
        nombreCliente
    })

    const ordenCreada = await orden.save();
    res.status(201).json(ordenCreada);
	
})

// @desc    Actualiza una orden
// @route   PUT /api/ordenes
// @access  Privado
const editarOrden = asyncHandler(async (req, res) => {
    const {
        _id,
        estatus,
    } = req.body

    const orden = await Orden.findById(_id);

    if(orden){
        orden.estatus = estatus || orden.estatus;
        

        const ordenActualizada = await orden.save();
		res.json(ordenActualizada);
    }else{
        res.status(404);
		throw new Error('Orden no encontrada');
    }

})


export {obtenerOrdenes, obtenerOrden, crearOrden, editarOrden,obtenerMisOrdenesCliente, obtenerMisOrdenesVendedor};