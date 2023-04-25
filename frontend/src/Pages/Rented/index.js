import React from 'react'
import { UserContext } from '../../Context/UserStorage';
import { api } from '../../Helpers/api';
import * as C from './styles';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Row } from 'react-bootstrap';
import AirIcon from '@mui/icons-material/Air';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import GppGoodIcon from '@mui/icons-material/GppGood';
import Swal from 'sweetalert2';

const Rented = () => {

    const [locacao, setLocacoes] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pageCount, setPageCount] = React.useState(0);
    const context = React.useContext(UserContext);
    const id = window.localStorage.getItem('id');

    React.useEffect(() => {

        const handleLocacoes = async () => {
            if(context.data){

              setLoading(true);
              const json = await api.getUsuario(id);
              setLocacoes(json);
              setLoading(false);
              setPageCount(Math.ceil(json.locacoes.length / 2));
            }
        }
        handleLocacoes();

     }, [context.data, id]);

     const devolverCarroLocacao = async (id) => {

      Swal.fire({
        title: 'Tem certeza que quer devolver este veículo?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: `Não`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Você devolveu o veículo com sucesso!',
            showConfirmButton: true,
            timer: 5000
          });
  
          await api.devolverCarroLocacao(id);
          window.location.href="/rented"
          
        } else if (result.isDenied) {
          Swal.close();
        }
      });

     }

     const dataFormat = (dataLocacao) => {

        const data = new Date(dataLocacao);
        const day = data.getDate() + 1;
        const month = data.getMonth() + 1;
        const year = data.getFullYear()
        return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`
     }

     const formatTempoLocacao = (dataLocacao, dataDevolucao) => {

      const diffInMs = new Date(dataDevolucao) - new Date(dataLocacao)
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return `${diffInDays === 0 ? "1" : diffInDays} dia(s)`
     }

     const navigate = useNavigate();
     const backButton = () => {
      navigate(-1);
    }

    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };

    if(!context.data) return null;

  return (
    <C.Container>

        <Button className='backButton' onClick={backButton} style={{ height: '50px', width: '140px'}}>
          <C.ButtonAlign> <ArrowBackIosIcon style={{transform: 'scale(0.9)', marginRight: 20}}/> <span>Voltar</span> </C.ButtonAlign>
        </Button>


      <div className="animeLeft" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-100px'}}>
        {locacao && locacao.locacoes.length < 1 &&
          <Card style={{ width: '40rem' , padding: 20, borderRadius: 10, background: "#eee"}}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '20px' }}>Você ainda não alugou nenhum carro!</Card.Title>
              <Card.Text style={{ fontSize: '1.2rem', textAlign: 'center' }}>
                Alugue seu carro na melhor locadora da região! Preços e carros únicos, apenas aqui.
              </Card.Text>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to={'/home'}>
                  <Button style={{background: "#1D2950", border: 0}} variant="primary">Alugar</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>}
        
      {locacao && !loading && locacao.locacoes.length >= 1 && (
              <C.Div>
                <div style={{  marginBottom: '50px', marginTop: '-100px' }}>
                  <Row xs={1} sm={2} md={2} lg={3} xl={3} gutter={16}>
                    {locacao && locacao.locacoes
                      .slice(currentPage * 2, currentPage * 2 + 2)
                      .map((l, index) => {
                      return (
                        <C.Card>
                          <C.InfoArea>
                            <C.VehicleArea>
                            <h4>{l.automovel.modelo.marca.nome} {l.automovel.modelo.nome}</h4>
                            <C.Adjust>
                            <img src={l.automovel.modelo.imagem} alt="Veículo"/> <br/>
                            <span style={{color: '#666'}}>Valor da locação: R$ {l.valor.toFixed(2)}</span> <br/>
                            <span style={{color: '#666'}}>Diária: R$ {l.automovel.diaria.toFixed(2)}/dia</span> <br/>
                            <span style={{color: '#666'}}>Placa: {l.automovel.placa}</span> <br/>
                            <span style={{color: '#666'}}>Data da locação: {dataFormat(l.dataLocacao)}</span> <br/>
                            <span style={{color: '#666'}}>Data da devolução: {dataFormat(l.dataDevolucao)}</span> <br/>
                            <span style={{color: '#666'}}>Tempo de locação: {formatTempoLocacao(l.dataLocacao, l.dataDevolucao)}</span>
                            <C.Icons style={{marginTop: 20}}>
                              <AirIcon style={{background: "#1A202C", color: "#FFF", borderRadius: '3px', padding: '3px', marginRight: '1rem'}}/>
                              <AirlineSeatReclineExtraIcon style={{background: "#1A202C", color: "#FFF", borderRadius: '3px', padding: '2px', marginRight: '1rem'}}/>
                              <AutoModeIcon style={{background: "#1A202C", color: "#FFF", borderRadius: '3px', padding: '3px', marginRight: '1rem'}}/>
                              <GppGoodIcon style={{background: "#1A202C", color: "#FFF", borderRadius: '3px', padding: '3px', marginRight: '1rem'}}/>
                            </C.Icons>
                            </C.Adjust>
                              {l.status === "ATIVO" && <C.ButtonToReturn style={{}} onClick={() => devolverCarroLocacao(l.id)}>Devolver</C.ButtonToReturn>}
                              {l.status === "DEVOLVIDO" && <C.ButtonReturned style={{}}>Devolvido</C.ButtonReturned>}
                              {l.status === "PENDENTE" && <C.ButtonPending style={{}}>Pendente</C.ButtonPending>}
                              {l.status === "REJEITADO" && <C.ButtonRejected style={{}}>Rejeitado</C.ButtonRejected>}
                            </C.VehicleArea>
                          </C.InfoArea>
                        </C.Card>
                        )
                    })}
                  </Row>
                </div>
                <ReactPaginate
                  previousLabel={'Anterior'}
                  nextLabel={'Próximo'}
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  containerClassName={'pagination justify-content-center'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link'}
                  activeClassName={'active'}
                />
              </C.Div>
            )}
      </div>
    </C.Container>
  )
}

export default Rented