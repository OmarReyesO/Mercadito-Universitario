import './style.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PantallaRegistro from './pantallas/PantallaRegistro';
import PantallaLogin from './pantallas/PantallaLogin';
import PantallaInicio from './pantallas/PantallaInicio';
import PantallaComida from './pantallas/categorias/PantallaComida';
import PantallaRopa from './pantallas/categorias/PantallaRopa';
import PantallaSalud from './pantallas/categorias/PantallaSalud';
import PantallaElectronica from './pantallas/categorias/PantallaElectronica';
import PantallaMas from './pantallas/categorias/PantallaMas';
import PantallaMiCuenta from './pantallas/PantallaMiCuenta';
import PantallaMisProductos from './pantallas/PantallaMisProductos';
import PantallaProducto from './pantallas/PantallaProducto';
import PantallaProductoEditar from './pantallas/PantallaProductoEditar';
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
							<Route path='/comida' component={PantallaComida} exact />	
							<Route path='/ropa-y-accesorios' component={PantallaRopa} exact />	
							<Route path='/salud-y-belleza' component={PantallaSalud} exact />	
							<Route path='/electronica' component={PantallaElectronica} exact />	
							<Route path='/otros' component={PantallaMas} exact />	
							<Route path='/mi-cuenta' component={PantallaMiCuenta} exact />	
							<Route path='/mis-productos' component={PantallaMisProductos} exact />	
							<Route path='/mis-productos/nuevo' component={PantallaProductoEditar} exact />	
							<Route path='/producto/:id' component={PantallaProducto} exact />
						</div>
				</main>
			</Router>
		</>
	);
}

export default App;
