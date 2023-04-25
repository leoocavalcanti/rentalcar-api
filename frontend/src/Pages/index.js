import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute'
import Home from './Home';
import Rented from './Rented';
import Vehicle from './Vehicle';
import Principal from './Principal';
import Register from './Register';
import Admin from './Admin';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';
import AdminLocations from '../PagesAdmin/AdminLocations';
import AdminVehicles from '../PagesAdmin/AdminVehicles';
import AdminClients from '../PagesAdmin/AdminClients';
import AdminEditLocation from '../PagesAdmin/AdminEditLocation';
import AdminEditVehicle from '../PagesAdmin/AdminEditVehicle';
import Profile from './Profile';
import AdminModelos from '../PagesAdmin/AdminModelos';
import AdminVehicleRegister from '../PagesAdmin/AdminVehicleRegister';
import AdminRegisterLocation from '../PagesAdmin/AdminRegisterLocation';
import AdminEditUser from '../PagesAdmin/AdminEditUser';
import AdminRegisterUser from '../PagesAdmin/AdminRegisterUser';
import AdminRegisterModelo from '../PagesAdmin/AdminRegisterModelo';
import AdminEditModelo from '../PagesAdmin/AdminEditModelo';
import AdminMarca from '../PagesAdmin/AdminMarca';
import AdminRegisterMarca from '../PagesAdmin/AdminRegisterMarca';
import AdminEditMarca from '../PagesAdmin/AdminEditMarca';

const Pages = () => {
  return (
    <Routes>
        <Route path="/" element={<Principal/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path="/rented" element={<ProtectedRoute><Rented/></ProtectedRoute>}></Route>
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
        <Route path="/vehicle/:automovelId" element={<ProtectedRoute><Vehicle/></ProtectedRoute>}></Route>
        <Route path="/admin" element={<ProtectedRouteAdmin><Admin/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/locacoes" element={<ProtectedRouteAdmin><AdminLocations/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/locacoes/:locacaoId" element={<ProtectedRouteAdmin><AdminEditLocation/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/automoveis" element={<ProtectedRouteAdmin><AdminVehicles/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/locacoes/cadastrar" element={<ProtectedRouteAdmin><AdminRegisterLocation/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/clientes/cadastrar" element={<ProtectedRouteAdmin><AdminRegisterUser/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/modelos/cadastrar" element={<ProtectedRouteAdmin><AdminRegisterModelo/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/marcas/cadastrar" element={<ProtectedRouteAdmin><AdminRegisterMarca/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/marcas/:marcaId" element={<ProtectedRouteAdmin><AdminEditMarca/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/marcas" element={<ProtectedRouteAdmin><AdminMarca/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/modelos/:modeloId" element={<ProtectedRouteAdmin><AdminEditModelo/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/clientes/:usuarioId" element={<ProtectedRouteAdmin><AdminEditUser/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/automoveis/cadastrar" element={<ProtectedRouteAdmin><AdminVehicleRegister/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/automoveis/:automovelId" element={<ProtectedRouteAdmin><AdminEditVehicle/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/modelos" element={<ProtectedRouteAdmin><AdminModelos/></ProtectedRouteAdmin>}></Route>
        <Route path="/admin/clientes" element={<ProtectedRouteAdmin><AdminClients/></ProtectedRouteAdmin>}></Route>
    </Routes>
  )
}

export default Pages