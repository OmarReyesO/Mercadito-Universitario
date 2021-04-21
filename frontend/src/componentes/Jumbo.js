import React from 'react';
import {Jumbotron, Container} from 'react-bootstrap';

const Jumbo = () => {
    return (
            <Jumbotron fluid style={{backgroundColor: "#4582ec"}}>
                <Container style={{color:"#FFFFFF"}}>
                    <h1>Bienvenidx!</h1>
                    <p>
                    This is a modified jumbotron that occupies the entire horizontal space of
                    its parent.
                    </p>
                </Container>
            </Jumbotron>
    );
}

export default Jumbo;
