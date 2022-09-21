// import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/views/Home';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AdministrarReceta from './components/views/receta/AdministrarReceta';
import CrearReceta from './components/views/receta/CrearReceta';
import Error404 from './components/views/Error404';
import EditarReceta from './components/views/receta/EditarReceta';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/administrar' element={<AdministrarReceta/>}></Route>
          <Route exact path='/administrar/crear' element={<CrearReceta/>}></Route>
          <Route exact path='/administrar/editar/:id' element={<EditarReceta/>}></Route>
          {/* <Route exact path='/administrar/producto/detalle/:id' element={<DetalleProducto></DetalleProducto>}></Route> */}
          <Route path='*' element={<Error404/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;