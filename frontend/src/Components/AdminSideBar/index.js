import React from 'react'
import { Link } from 'react-router-dom'
import * as C from './styles'

const AdminSideBar = ({width}) => {

  
  const location = window.location.pathname;

  return (
    <C.Container width={width}>

      <Link to="/admin/locacoes">
      <C.ManagerArea link="/admin/locacoes" location={location}>
        <span>Gerenciar locações</span>
      </C.ManagerArea>
      </Link>

      <Link to="/admin/automoveis">
      <C.ManagerArea link="/admin/automoveis" location={location}>
        <span>Gerenciar automóveis</span>
      </C.ManagerArea> 
      </Link>

      <Link to="/admin/clientes">
      <C.ManagerArea link="/admin/clientes" location={location}>
        <span>Gerenciar usuários</span>
      </C.ManagerArea>
      </Link>
      <Link to="/admin/modelos">
      <C.ManagerArea link="/admin/modelos" location={location}>
        <span>Gerenciar modelos</span>
      </C.ManagerArea>
      </Link>
      <Link to="/admin/marcas">
      <C.ManagerArea link="/admin/marcas" location={location}>
        <span>Gerenciar marcas</span>
      </C.ManagerArea>
      </Link>

    </C.Container>
  )
}

export default AdminSideBar