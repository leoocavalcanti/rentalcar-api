import * as C from './styles';
import React from 'react'
import { Row } from 'react-bootstrap';
import { api } from '../../Helpers/api';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import GppGoodIcon from '@mui/icons-material/GppGood';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import SearchBar from '../../Components/SearchBar';
import { Button } from 'react-bootstrap';

const Home = () => {

  const [automoveis, setAutomoveis] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {

    const handleAutomoveis = async () => {

        const json = await api.getAutomoveisHome(count, search);
        setAutomoveis(json);

    }

    handleAutomoveis();
 }, [count, search]);

  const handleNext = () => {

      if((count + 1) < automoveis.totalPages){

          setCount(count + 1);
          console.log(count)
      }


  }
  
  const handlePrevious = () => {


      if(count >= 1){

        setCount(count - 1);

  }
    
  }

  const handleSearch = (e) => {

    setSearch(e.target.value);
  }

  const handleSubmitSearch = async (e) => {

    e.preventDefault();

  }


  return (
    <C.Container>

        <C.AreaSuperior>
        <SearchBar text="Pesquisar automóvel pelo modelo" value={search} onChange={handleSearch} onClick={handleSubmitSearch}/>
      </C.AreaSuperior>

    <C.Div>
      <div className="animeLeft" style={{ marginLeft: '190px', marginBottom: '30px' }}>
        <C.Wrapper xs={1} sm={2} md={2} lg={3} xl={3} gutter={16}>
          {automoveis && automoveis.content
            .map((vehicle, index) => {
            return (
              <Link className="adjustCard" to={`/vehicle/${vehicle.id}`} key={index} style={{textDecoration: 'none', color: "#333"}}>
              <C.Card>
                <C.InfoArea>
                  <C.VehicleArea>

                  <h4>{vehicle.modelo.marca.nome} {vehicle.modelo.nome} </h4>
                  <C.Adjust>
                  <img src={vehicle.modelo.imagem} alt="Veículo"/> <br/>
                  <span style={{color: '#666'}}>R$ {vehicle.diaria.toFixed(2)}/dia</span>
                  <C.RatingArea>
                  <Rating name="read-only" value="5" readOnly/>
                  <p>Recomendado</p>
                  </C.RatingArea>
                  <C.Icons>
                    <AirIcon style={{background: "#1A202C", color: "#FFF", borderRadius: '3px', padding: '3px', marginRight: '1rem'}}/>
                    <AirlineSeatReclineExtraIcon style={{background: "#1A202C", color: "#FFF", borderRadius: '3px', padding: '2px', marginRight: '1rem'}}/>
                    <AutoModeIcon style={{background: "#1A202C", color: "#FFF", borderRadius: '3px', padding: '3px', marginRight: '1rem'}}/>
                    <GppGoodIcon style={{background: "#1A202C", color: "#FFF", borderRadius: '3px', padding: '3px', marginRight: '1rem'}}/>

                  </C.Icons>
                  </C.Adjust>
                    {vehicle.status === "DISPONIVEL" ? <Link to={`/vehicle/${vehicle.id}`}>Ver detalhes</Link> : <button disabled>Indisponível</button>}
                  </C.VehicleArea>

                </C.InfoArea>

              </C.Card>
              </Link>
              )
          })}
        </C.Wrapper>
      </div>
    </C.Div>
    <div>

      
    <C.ButtonGroup>
      <Button onClick={handlePrevious} className="buttonColor" variant="outline-primary">Anterior</Button>{' '}
      <Button onClick={handleNext} className="buttonColor" variant="outline-primary">Próximo</Button>{' '}
    </C.ButtonGroup>

    </div>
    </C.Container>
  )
}


export default Home;