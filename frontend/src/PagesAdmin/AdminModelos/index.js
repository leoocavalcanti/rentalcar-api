import * as C from "./styles";
import React from 'react'
import AdminSideBar from "../../Components/AdminSideBar";
import ModalModelosAdmin from "../../Components/ModalModelosAdmin";


const AdminModelos = () => {


  return (
    <C.Container>
      <AdminSideBar width={360}/>
      <ModalModelosAdmin/>
    </C.Container>
  )
}

export default AdminModelos;