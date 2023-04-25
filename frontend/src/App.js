import React from 'react'
import Pages from './Pages';
import './index.css'
import Header from './Components/Header';
import { UserContext } from './Context/UserStorage';
import { api } from './Helpers/api';

const App = () => {

  const context = React.useContext(UserContext);
  const token = window.localStorage.getItem("token");
  
  React.useEffect(() => {

    const handleAutomoveis = async () => {

      if(token){

        const json = await api.getAllAutomoveis();
        if(json.error === "invalid_token"){
  
          window.localStorage.clear();
          window.location.href = "/login"
        }
      }

    }

    handleAutomoveis();

  }, []);

  return (
    <div>
      {context.data && context.data.nome && <Header/>}
      <Pages/>
    </div>
  );
};

export default App;