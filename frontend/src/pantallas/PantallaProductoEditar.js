import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col, Form, Button, InputGroup} from 'react-bootstrap';
import AWS from 'aws-sdk'
import {obtenerProducto, editarProducto, reinciarProductoEditado} from '../acciones/accionesProductos';

import Loader from '../componentes/Loader';
import Mensaje from '../componentes/Mensaje';


const PantallaProducto = ({history, match}) => {
    let ID_PRODUCTO = match.params.id;

      // Set the Region 
      AWS.config.update({
        accessKeyId:'AKIAUWHIX6D5TQZLBQFO',
        secretAccessKey: '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',
        region: 'us-west-1'
    });

    //Create S3 service object
    const s3 = new AWS.S3({})

    const dispatch = useDispatch();

    const productoObtenido = useSelector((state) => state.productoObtenido);
    const {error, loading, producto } = productoObtenido;

    const productoEditado = useSelector((state) => state.productoEditado);
    const  { loading: editadoLoading, exito, error: editadoError} = productoEditado;

    const imgbaseURL = "https://imagenesmercadouni.s3-us-west-1.amazonaws.com/"

    const [imgProducto1, setImgProducto1] = useState();
    const [displayImg1, setDisplayImg1] = useState(imgbaseURL + 'default_product.png');
    const [imgUpload, setImgUpload] = useState(false);

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [cantidadEnStock, setCantidadEnStock] = useState(0);
  
    const cargarFoto = (e) => {
        
        const img1 = e.target.files[0];
        console.log(img1);
        img1 !== undefined && setDisplayImg1(URL.createObjectURL(img1));
        img1 !== undefined && setImgProducto1(img1);
      
        
	};


    const submitHandler = (e) =>{
        e.preventDefault();
        const nom = producto.nombre.replace(/\s/g, "_");
        const filename = ID_PRODUCTO + '_' + nom.toLowerCase() + '.jpg';
         
        // Create the parameters for calling listObjects
        var bucketParams = {
            Bucket : 'imagenesmercadouni',
            Key : filename,
            ContentType: 'image/jpg',
            Body: imgProducto1
        };

        s3.putObject(bucketParams, function(err, data){
            if(err){
                console.log(err);
                
            }else{
                const producto ={
                    _id: ID_PRODUCTO,
                    nombre,
                    descripcion,
                    precio,
                    categoria,
                    cantidadStock: cantidadEnStock,
                    imagenes: [imgbaseURL + bucketParams.Key],
                }

                dispatch(editarProducto(producto));
            } 
        })
    }

   
    useEffect(() => {
        if(!producto || producto._id !== ID_PRODUCTO){
            dispatch(obtenerProducto(ID_PRODUCTO));
        }else{
            setNombre(producto.nombre);
            setDescripcion(producto.descripcion);
            setPrecio(producto.precio);
            setCategoria(producto.categoria);
            setCantidadEnStock(producto.cantidadStock);
            console.log(producto.imagenes[0])
            if(producto.imagenes[0] !== undefined) setDisplayImg1(producto.imagenes[0]);
        }

        if(exito){
            dispatch(obtenerProducto(ID_PRODUCTO));
            dispatch(reinciarProductoEditado());
        }
    }, [dispatch, producto, ID_PRODUCTO])

    return (
        <Container className="pt-5" style={{height: '1000px'}}>
            {error && <Mensaje variant="danger">Error</Mensaje>}
            {(loading || editadoLoading) ? (<Loader />) : (
                <>
                    {producto ? (
                       <>
                            <Row>
                                <Col md={12}>
                                    <Form.File 
                                    label="Agregue una imagen"
                                    custom
                                    onChange={cargarFoto}
                                    />  
                                </Col>
                            </Row>

                            <Row>
                                <Col className="mt-3" sm={12} md={4}>
                                    <img style={{height:'350px', width:'350px'}} src={displayImg1} />
                                </Col>

                                <Col sm={12} md={8} className="mt-5">
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group>
                                            <Form.Label>Nombre del producto</Form.Label>
                                            <Form.Control
                                                required
                                                type='text'
                                                placeholder='Eg. Burrito de rojo'
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                            />
                                        </Form.Group>
                                            
                                        <Form.Group>
                                            <Form.Label>Descripción del producto</Form.Label>
                                            <Form.Control
                                                required
                                                as='textarea'
                                                placeholder='Eg. Burrito de carne deshebrada de res en salsa roja'
                                                value={descripcion}
                                                onChange={(e) => setDescripcion(e.target.value)}
                                            />
                                        </Form.Group>
                    
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Precio</Form.Label>
                                                    <InputGroup className="mb-2">
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>$</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control
                                                            required
                                                            type='number'
                                                            value={precio}
                                                            onChange={(e) => setPrecio(e.target.value)}
                                                        />
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>MXN</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Categoría</Form.Label>
                                                    <Form.Control 
                                                        value={categoria}
                                                        required
                                                        as="select"
                                                        onChange={(e) => setCategoria(e.target.value)}
                                                    >
                                                        <option value="">Categoría de tu producto</option>
                                                        <option value="comida">Comida</option>
                                                        <option value="ropa">Ropa y accesorios</option>
                                                        <option value="salud">Salud y belleza</option>
                                                        <option value="electronica">Electrónica</option>
                                                        <option value="otros">Otros</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Cantidad disponible</Form.Label>
                                                    <InputGroup className="mb-2">
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>x</InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control
                                                            required
                                                            type='number'
                                                            value={cantidadEnStock}
                                                            onChange={(e) => setCantidadEnStock(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button className="float-right" type="submit">Guardar producto</Button>
                                </Form>
                                </Col>
                            </Row>
                       </>
                    ) : (
                        <>
                            <h4 className="text-center">Lo sentimos, no pudimos encontrar el producto solicitado :(</h4>
                            <div className="d-flex justify-content-center">
                                <img className="mt-5 shadow" src="https://pbs.twimg.com/profile_images/1273702207796449285/j8nbij6f_400x400.jpg" />
                            </div>
                        </>
                    )}
                </>
            )}
        </Container>
    );
}

export default PantallaProducto;
