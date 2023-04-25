import * as C from "./styles";
import React from 'react'
import AdminSideBar from "../../Components/AdminSideBar";
import ModalMarcaAdmin from "../../Components/ModalMarcaAdmin";


const AdminMarca = () => {

  return (
    <C.Container>
      <AdminSideBar width={360}/>
      <ModalMarcaAdmin/>
    </C.Container>
  )
}

export default AdminMarca