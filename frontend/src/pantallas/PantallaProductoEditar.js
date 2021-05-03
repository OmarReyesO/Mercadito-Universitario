import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { Row, Col, Container, Form, Button, InputGroup} from 'react-bootstrap';
import { crearProducto } from '../acciones/accionesProductos';

const PantallaProductoEditar = ({history}) => {
    const dispatch = useDispatch();
    const usuarioLogin = useSelector((state) => state.usuarioLogin);
    const  { infoUsuario } = usuarioLogin;

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [cantidadEnStock, setCantidadEnStock] = useState(0);

    useEffect(() => {
        if(!infoUsuario) history.push('/login');
    }, [infoUsuario])

    const submitHandler = (e) =>{
        e.preventDefault();
        const producto = {
            usuario: infoUsuario._id,
            nombre,
            descripcion,
            precio,
            categoria,
            cantidadEnStock
        }
        console.log(producto);
        dispatch(crearProducto(producto))
    }

    return (
        <Container className="pt-5" style={{height: '1000px'}}>
            {infoUsuario && (
                <>
                <h3>Nuevo producto</h3>
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
                </>
            )}  
        </Container>
    );
}

export default PantallaProductoEditar;
