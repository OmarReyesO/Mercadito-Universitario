import React from 'react';
import { Alert } from 'react-bootstrap';

const Mensaje = ({ variant, children }) => {
	return <Alert variant={variant} className="text-center">{children}</Alert>;
};

Mensaje.defaultProps = {
	variant: 'info',
};

export default Mensaje;
