import './style.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PantallaRegistro from './pantallas/PantallaRegistro';
import PantallaLogin from './pantallas/PantallaLogin';
import PantallaInicio from './pantallas/PantallaInicio';
import Header from './componentes/Header';
import HeaderCategorias from './componentes/HeaderCategorias';
import { Container } from 'react-bootstrap';

function App() {
	return (
		<>
			<Router>
				<Header />
				<HeaderCategorias />
				<main>
						<Route path='/' component={PantallaInicio} exact />
						<Route path='/login' component={PantallaLogin} exact />
						<div className="contenido">
							<Route path='/register' component={PantallaRegistro} exact />	
						</div>
				</main>
			</Router>
		</>
	);
}

export default App;
