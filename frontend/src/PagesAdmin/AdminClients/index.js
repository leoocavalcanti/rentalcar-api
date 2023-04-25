import * as C from "./styles";
import React from 'react'
import AdminSideBar from "../../Components/AdminSideBar";
import ModalClientsAdmin from "../../Components/ModalClientsAdmin";


const AdminClients = () => {


  return (
    <C.Container>
      <AdminSideBar width={360}/>
      <ModalClientsAdmin/>
    </C.Container>
  )
}

export default AdminClients