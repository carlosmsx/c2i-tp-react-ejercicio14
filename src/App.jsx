// import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/views/Home';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AdministrarReceta from './components/views/receta/AdministrarReceta';
import CrearReceta from './components/views/receta/CrearReceta';
import Error404 from './components/views/Error404';
import EditarReceta from './components/views/receta/EditarReceta';
import DetalleReceta from './components/views/receta/DetalleReceta';
import Login from './components/views/Login';
import { useState } from 'react';
import Logoff from './components/views/Logoff';

function App() {
  const [adminLogged, setAdminLogged] = useState(false);
  const [sesionIniciada, setSesionIniciada] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Header adminLogged={adminLogged} sesionIniciada={sesionIniciada}/>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/login' element={<Login setAdminLogged={setAdminLogged} setSesionIniciada={setSesionIniciada}/>}></Route>
          <Route exact path='/logoff' element={<Logoff setAdminLogged={setAdminLogged} setSesionIniciada={setSesionIniciada}/>}></Route>
          <Route exact path='/receta/administrar' element={<AdministrarReceta/>}></Route>
          <Route exact path='/receta/crear' element={<CrearReceta/>}></Route>
          <Route exact path='/receta/editar/:id' element={<EditarReceta/>}></Route>
          <Route exact path='/receta/detalle/:id' element={<DetalleReceta/>}></Route>
          <Route path='*' element={<Error404/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;