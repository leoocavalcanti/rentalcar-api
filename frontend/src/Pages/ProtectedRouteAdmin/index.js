import React from 'react'
import { Navigate } from 'react-router-dom';
import { api } from '../../Helpers/api';

const ProtectedRouteAdmin = ({children}) => {

  const [admin, setAdmin] = React.useState(null);

  React.useEffect(() => {

    const handleAdmin = async () => {

      let isAdmin = await api.isAdmin();
      setAdmin(isAdmin);

    }

    handleAdmin()

  }, []);

  if(admin === null) return null
  return admin ? children : <Navigate to="/home"/>
}

export default ProtectedRouteAdmin