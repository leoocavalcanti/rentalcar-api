import React from 'react'
import { api } from '../Helpers/api';

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
    
        const token = window.localStorage.getItem("token");
        const id = window.localStorage.getItem("id");

        if(token && id){

            const handleLogin = async () => {

                const json = await api.checkToken(id);
                setData(json);
            }
            
            handleLogin();
         }

    }, []);

  return (
    <UserContext.Provider value={{data, setData}}>

        {children}

    </UserContext.Provider>
  )
}

