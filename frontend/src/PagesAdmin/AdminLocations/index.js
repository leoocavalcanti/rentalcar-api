import * as C from "./styles";
import React from 'react'
import AdminSideBar from "../../Components/AdminSideBar";
import ModalLocationAdmin from "../../Components/ModalLocationAdmin";


const AdminLocations = () => {

  return (
    <C.Container>
      <AdminSideBar width={360}/>
      <ModalLocationAdmin/>
    </C.Container>
  )
}

export default AdminLocations