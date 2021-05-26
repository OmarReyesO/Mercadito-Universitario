import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Nav, Card, Modal, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import {obtenerListaProductos} from '../../acciones/accionesProductos';
import {obtenerVendedor} from '../../acciones/accionesUsuario';
import {crearOrden, reiniciarOrdenCreada} from '../../acciones/accionesOrdenes';
import Loader from '../../componentes/Loader';


const PantallaComida = ({history}) => {
    const dispatch = useDispatch();

    const usuarioLogin = useSelector((state) => state.usuarioLogin)
    const {infoUsuario} = usuarioLogin;

    const listaProductos = useSelector((state) => state.listaProductos)
    const {loading, productos, error} = listaProductos;

    const ordenCreada = useSelector((state) => state.ordenCreada)
    const {exito, loading: ordenLoading, error: ordenError} = ordenCreada;

    const vendedor = useSelector((state) => state.vendedor)
    const {perfilVendedor, loading:loadingVendedor} = vendedor;

    const [show, setShow] = useState(false);
    const [productoActivo, setProductoActivo] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cardHandler = (p) =>{
        handleShow();
        setProductoActivo(p);
    }

    const handleOrden = (p) =>{
        const orden = {
            cliente: infoUsuario._id,
            vendedor: productoActivo.usuario,
            estatus: 'pendiente',
            productos: [productoActivo],
            nombreCliente: `${infoUsuario.nombre} ${infoUsuario.apellido}`,
            nombreVendedor:`${perfilVendedor.nombre} ${perfilVendedor.apellido}`,
        }
        dispatch(crearOrden(orden));
    }

    useEffect(() => {
        dispatch(obtenerListaProductos("salud"));
        if(exito){
            history.push('/mis-pedidos')
            dispatch(reiniciarOrdenCreada())
        }
    }, [dispatch, history, exito])

    useEffect(() => {
        dispatch(obtenerVendedor(productoActivo.usuario));
    },[dispatch, productoActivo])

    return (
        <div className="pt-5 mx-5" style={{height:'1000px'}}>
                <Row>
                    <LinkContainer to='/'>
                        <Nav.Link>Inicio / Salud y belleza</Nav.Link>
                    </LinkContainer>
                </Row>
                {!ordenLoading && !loading && productos ? (
                    <>
                        <h1>Salud y belleza</h1>
                        <Row>
                        {productos.map((p, index) => (
                            <Col key={index} sm={12} md={3} className="my-3">
                                <Card onClick={() => cardHandler(p)}  className="product-card"  style={{ height:'11rem' }}>
                                    <Row>
                                        <Col className="px-5 py-4" md={6}>
                                                    <h6>{p.nombre}</h6>
                                                    {p.cantidadStock === 0 ? (<p style={{color:'red', fontFamily:"Roboto", fontSize:'12px'}}>PRODUCTO NO DISPONIBLE</p>) : (<p style={{fontFamily:'Roboto', fontSize:'14px'}} className="text-muted">{p.descripcion}</p>)}
                                                    <h6 >${p.precio}MXN</h6>
                                        </Col>
                                        <Col className="pl-5" md={6}>
                                            <img style={{height:'10.80rem', width:'9.75rem'}} src={(p.imagenes && p.imagenes.length > 0) !== undefined ? p.imagenes[0] : "https://www.smallwoods.org.uk/assets/Uploads/Documents/ac72cd8e0a/product-default-img__FitMaxWzEwMDAsODAwXQ.jpg"} />
                                        </Col>
                                    </Row>
                                </Card>   
                            </Col>

                            
                        ))}
                        </Row>
                        
                        <Modal show={show} onHide={handleClose} className="mt-5">
                            <Modal.Header closeButton>
                                <Modal.Title>{productoActivo.nombre}</Modal.Title>
                            </Modal.Header>

                            {loadingVendedor ?(<Loader />) : (
                                <>
                                    <Modal.Body>
                                        <Row>
                                            <Col className='mt-5' md={4}>
                                                <img 
                                                        src={(productoActivo.imagenes && productoActivo.imagenes.length > 0) !== undefined ? productoActivo.imagenes[0] : "https://www.smallwoods.org.uk/assets/Uploads/Documents/ac72cd8e0a/product-default-img__FitMaxWzEwMDAsODAwXQ.jpg"} 
                                                        style={{width: '150px', height:'150px'}}
                                                />
                                            </Col>
                                            <Col md={8} className="pt-3">
                                                {perfilVendedor && (<p className="text-center" style={{fontFamily:'Roboto'}}><strong>Vendedor</strong>: {`${perfilVendedor.nombre} ${perfilVendedor.apellido}`}</p>)}
                                                <br/>
                                                <h6 className="text-center">{productoActivo.descripcion}</h6>
                                                <br/>
                                                <p className="text-center" style={{fontFamily:'Roboto'}}><strong >Precio:</strong>${productoActivo.precio}</p>
                                                <br/>
                                                <p className="text-center" style={{fontFamily:'Roboto'}}><strong>Cantidad disponible:</strong>{productoActivo.cantidadStock}</p>
                                            </Col>
                                        </Row>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                        Cerrar
                                        </Button>

                                        {productoActivo.cantidadStock > 0 && (
                                            <Button variant="primary" onClick={handleOrden}>
                                                Hacer pedido
                                            </Button>
                                        )}
                                    </Modal.Footer>
                                </>
                            )}
                            
                        </Modal>

                    </>
                ) : <Loader />}
        </div>
    );
}

export default PantallaComida;
