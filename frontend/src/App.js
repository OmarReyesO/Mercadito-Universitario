import { BrowserRouter as Router, Route } from 'react-router-dom';
import PantallaRegistro from './pantallas/PantallaRegistro';
import PantallaLogin from './pantallas/PantallaLogin';
import PantallaUsuario from './pantallas/PantallaUsuario';
import Header from './componentes/Header';
import { Container } from 'react-bootstrap';

function App() {
	return (
		<>
			<Router>
				<Header />
				<main>
					<Container>
						<Route path='/' component={PantallaLogin} exact />
						<Route path='/login' component={PantallaLogin} exact />
						<Route path='/user' component={PantallaUsuario} exact />
						<Route path='/register' component={PantallaRegistro} exact />
					</Container>
				</main>
			</Router>
		</>
	);
}

export default App;
