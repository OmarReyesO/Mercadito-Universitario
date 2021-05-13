import asyncHandler from 'express-async-handler';
import Producto from '../modelos/ModeloProducto.js';

// @desc    Obtiene todos los productos por categoria
// @route   GET /api/productos
// @access  Publico
const obtenerProductos = asyncHandler(async (req, res) => {

    let productos = {};

    if(req.query.categoria){
        const queries = {
            categoria: req.query.categoria
        }

        productos = await Producto.find({...queries});
    }else{
        productos = await Producto.find({});
    }
    
    if(productos){
        res.json(productos)
    }else{
        throw new Error('Productos no encontrados');
    }
})

// @desc    Obtiene un producto por ID
// @route   GET /api/productos/producto
// @access  Privado
const obtenerProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.query.id);
    
    if(producto){
        res.json(producto)
    }else{
        throw new Error('Productos no encontrados');
    }
})

// @desc    Obtiene todos los productos de un usuario
// @route   GET /api/productos
// @access  Privado
const obtenerMisProductos = asyncHandler(async (req, res) => {
    const productos = await Producto.find({usuario:req.query.id});
    
    if(productos){
        res.json(productos)
    }else{
        throw new Error('Productos no encontrados');
    }
})


// @desc    Crea un producto
// @route   POST /api/productos
// @access  Privado
const crearProducto = asyncHandler(async (req, res) => {
    console.log(req.body)
    const 
    {
        usuario,
        nombre,
        descripcion,
        precio,
        categoria,
        cantidadStock,
    } = req.body;

    const producto = await Producto.create({
        usuario,
        nombre,
        descripcion,
        precio,
        categoria,
        cantidadStock,
    })

    const productoCreado = await producto.save();
    res.status(201).json(productoCreado);
	
})


export {obtenerProductos, obtenerProducto, crearProducto, obtenerMisProductos};