import React, { useState } from 'react'
import * as C from "./styles"
import { FaBars } from 'react-icons/fa'
import user from "../../Assets/user.png"
import Sidebar from '../Sidebar'
import { UserContext } from '../../Context/UserStorage'
import { Link } from 'react-router-dom'

const Header = () => {

  const [sidebar, setSidebar] = useState(false)
  const context = React.useContext(UserContext);

  const showSiderbar = () => setSidebar(!sidebar)

  if(!context.data) return null;

  return (
    <C.Container>
      <FaBars onClick={showSiderbar} />
      <C.UserInfo>
        <img src={user} alt="perfil"/>
        <Link to="/profile">
        <h4>{context.data.nome}</h4>
        </Link>
      </C.UserInfo>
      {sidebar && <Sidebar active={setSidebar} />}
    </C.Container>
  )
}

export default Header