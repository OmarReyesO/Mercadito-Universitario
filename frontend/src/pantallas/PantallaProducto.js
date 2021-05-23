import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col, Form} from 'react-bootstrap';
import {obtenerProducto} from '../acciones/accionesProductos';

import Loader from '../componentes/Loader';
import Mensaje from '../componentes/Mensaje';


const PantallaProducto = ({history, match}) => {
    let ID_PRODUCTO = match.params.id;

    const dispatch = useDispatch();

    const productoObtenido = useSelector((state) => state.productoObtenido);
    const {error, loading, producto } = productoObtenido;

    const imgbaseURL = "https://imagenesmercadouni.s3-us-west-1.amazonaws.com/"

    const [imgProducto1, setImgProducto1] = useState(imgbaseURL + 'default_product.png');
    const [imgProducto2, setImgProducto2] = useState(imgbaseURL + 'default_product.png');
    const [imgProducto3, setImgProducto3] = useState(imgbaseURL + 'default_product.png');

    useEffect(() => {
        dispatch(obtenerProducto(ID_PRODUCTO));
    }, [dispatch])

    return (
        <Container className="pt-5" style={{height: '1000px'}}>
            {error && <Mensaje variant="danger">Error</Mensaje>}
            {loading ? (<Loader />) : (
                <>
                    {producto ? (
                        <>
                        <Row>
                            <Col className="mt-3" sm={12} md={4}>
                                <img style={{height:'350px'}} src={imgProducto1} />
                            </Col>
                            <Col md={8} className="mt-5">
                                <h4 className="mt-4">{producto.nombre}</h4>
                                <p style={{fontFamily:'Roboto', fontSize:'18px'}} className="mt-4">{producto.descripcion}</p>
                                <p style={{fontFamily:'Roboto', fontSize:'18px'}} className="mt-4">${producto.precio} MXN</p>
                                <p style={{fontFamily:'Roboto', fontSize:'18px'}} className="mt-4">Cantidad disponible: {producto.cantidadStock}</p> 
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
