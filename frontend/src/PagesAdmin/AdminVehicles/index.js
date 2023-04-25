import * as C from "./styles";
import React from 'react'
import AdminSideBar from "../../Components/AdminSideBar";
import ModalCarAdmin from "../../Components/ModalCarAdmin";


const AdminVehicles = () => {

  return (
    <C.Container>
      <AdminSideBar width={360}/>
        <ModalCarAdmin/>
    </C.Container>
  )
}

export default AdminVehicles