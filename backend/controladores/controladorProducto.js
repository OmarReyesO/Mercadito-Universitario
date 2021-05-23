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

// @desc    Actualiza un producto
// @route   PUT /api/productos
// @access  Privado
const editarProducto = asyncHandler(async (req, res) => {
    const {
        _id,
        imagenes,
        precio, 
        cantidadStock,
        nombre,
        descripcion,
        categoria,
    } = req.body

    const producto = await Producto.findById(_id);

    if(producto){
        producto.imagenes = imagenes || producto.imagenes;
        producto.precio = precio || producto.precio;
        producto.cantidadStock = cantidadStock || producto.cantidadStock;
        producto.nombre = nombre || producto.nombre;
        producto.descripcion = descripcion || producto.descripcion;
        producto.categoria = categoria || producto.categoria;

        const productoActualizado = await producto.save();
		res.json(productoActualizado);
    }else{
        res.status(404);
		throw new Error('Producto no encontrado');
    }

})


export {obtenerProductos, obtenerProducto, crearProducto, obtenerMisProductos, editarProducto};