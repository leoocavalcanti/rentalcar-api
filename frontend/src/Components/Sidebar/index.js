import React from 'react'
import { Container, Content } from './styles'
import { FaTimes } from 'react-icons/fa'
import { faCar, faKey, faRightFromBracket, faGears, faUser } from '@fortawesome/free-solid-svg-icons'

import SidebarItem from '../SidebarItem'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import { api } from '../../Helpers/api'

const Sidebar = ({ active }) => {

  const [isAdmin, setIsAdmin] = React.useState("");

  React.useEffect(() => {

    const handleAdmin = async () => {

      const admin = await api.isAdmin();
      setIsAdmin(admin);
    }

    handleAdmin();

  }, []);


  const closeSidebar = () => {
    active(false);
  }

  const showLogoutAlert = () => {

    closeSidebar()
    
    Swal.fire({
      title: 'Você deseja sair?',
      showDenyButton: true,
      confirmButtonText: 'Sair',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Você deslogou do sistema.')
        api.doLogout();
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <Link to='/home' style={{ textDecoration: 'none' }} onClick={closeSidebar}>
          <SidebarItem Icon={faCar} Text="Veículos"/>
        </Link>
        <Link to='/rented' style={{ textDecoration: 'none' }} onClick={closeSidebar}>
          <SidebarItem Icon={faKey} Text="Reservas"/>
        </Link>
        <Link to='/profile' style={{ textDecoration: 'none' }} onClick={closeSidebar}>
          <SidebarItem Icon={faUser} Text="Meu perfil"/>
        </Link>
        {isAdmin &&
        <Link to='/admin/locacoes' style={{ textDecoration: 'none' }} onClick={closeSidebar}>
          <SidebarItem Icon={faGears} Text="Painel Admin"/>
        </Link>
        }
        <SidebarItem Icon={faRightFromBracket} onClick={showLogoutAlert} Text="Sair"/>
        {/* <SidebarItem Icon={FaRegCalendarAlt} Text="Calendar" /> */}
        {/* <SidebarItem Icon={FaIdCardAlt} Text="Employees" /> */}
        {/* <SidebarItem Icon={FaRegFileAlt} Text="Reports" /> */}
        {/* <SidebarItem Icon={FaRegSun} Text="Settings" /> */}
      </Content>
    </Container>
  )
}

export default Sidebar