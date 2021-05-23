import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Jumbo from '../componentes/Jumbo';
import {Container, Row, Col} from 'react-bootstrap';
import {obtenerListaProductos} from '../acciones/accionesProductos'
import Loader from '../componentes/Loader'

const PantallaInicio = () => {
    const dispatch = useDispatch();

    const listaProductos = useSelector((state) => state.listaProductos);
    const {error, loading, productos} = listaProductos;

    const [productosImg, setProductosImg] = useState([]);

    useEffect(() => {
        if(!productos){
            dispatch(obtenerListaProductos());
        }else if(productos && productosImg.length === 0){
            const imgs = productos.filter((p) => (
                p.imagenes.length > 0
            ));
            setProductosImg(imgs);
        }
    },[dispatch, productos, productosImg])

    return (
        <Container className="pt-5">
                {loading || !productos || !productosImg ? <Loader /> : (
                    <>
                        <Row>
                            <Col className="ci m-3 p-5">
                                <h4>Los más vendidos</h4>
                                {[0,1,2].map((p, index) => (
                                        <div style={{display:'inline'}} key={index}>
                                            <img className="m-2" style={{height:'100px', width:'100px'}} src={productos[p].imagenes[0]}/>
                                        </div>
                                ))}
                            </Col>
                            <Col className="ci m-3 p-5">
                                <h4>Nuevos productos</h4>
                                {[1,2,3].map((p, index) => (
                                        <div style={{display:'inline'}} key={index}>
                                            <img className="m-2" style={{height:'100px', width:'100px'}} src={productos[p].imagenes[0]}/>
                                        </div>
                                ))}
                            </Col>
                        </Row> 
                        <Row>
                            <Col className="ci m-3 p-5">
                                <h4>Más productos</h4>
                                {productosImg.map((p, index) => (
                                        <div style={{display:'inline'}} key={index}>
                                            <img className="m-2" style={{height:'100px', width:'100px'}} src={p.imagenes[0]}/>
                                        </div>
                                ))}
                            </Col>
                        </Row> 
                    </>
                )}
                
        </Container>
    );
}

export default PantallaInicio;
