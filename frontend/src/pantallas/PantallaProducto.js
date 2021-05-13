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


    const cargarFoto = (e) => {
        
        const img1 = e.target.files[0];
        const img2 = e.target.files[1];
        const img3 = e.target.files[2];

        console.log(img1,img2,img3)

        img1 !== undefined && setImgProducto1(URL.createObjectURL(img1));
        img2 !== undefined && setImgProducto2(URL.createObjectURL(img2));
        img3 !== undefined && setImgProducto3(URL.createObjectURL(img3));

        // Create the parameters for calling listObjects
        var bucketParams = {
            Bucket : 'imagenesmercadouni',
            Key : 'test1.jpg',
            ContentType: 'image/jpg',
            Body: img1
        };

        //s3.putObject(bucketParams, function(err, data){
         //   if(err) console.log(err);
          //  else console.log("success", data);
        //})
	};

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
                            <Col>
                                <h1>{producto.nombre}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-3" sm={12} md={4}>
                                <div style={{width:'300px', height:'300px'}}>
                                    <img style={{height:'300px'}} src={imgProducto1} />
                                </div>
                            </Col>
                            <Col className="mt-3" sm={12} md={4}>
                                <div style={{width:'300px',height:'300px'}}>
                                    <img style={{height:'300px'}} src={imgProducto2} />
                                </div>
                            </Col>
                            <Col className="mt-3" sm={12} md={4}>
                                <div style={{width:'300px',height:'300px'}}>
                                    <img style={{height:'300px'}} src={imgProducto3} />
                                </div>
                            </Col>
                        </Row>
                        </>
                    ) : (
                        <>
                            <h4 className="text-center">Lo sentimos, no pudimos encontrar el producto solicitado :(</h4>
                            <div class="d-flex justify-content-center">
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
