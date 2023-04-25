import { TextField } from '@mui/material';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminSideBar from '../../Components/AdminSideBar';
import { api } from '../../Helpers/api';
import * as C from './styles';
import { Button } from 'react-bootstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';

const AdminEditLocation = () => {


  const {locacaoId} = useParams();
  const navigate = useNavigate();

  const [locacao, setLocacao] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [valorLocacao, setValorLocacao] = React.useState("");
  const [dataLocacao, setDataLocacao] = React.useState("");
  const [dataDevolucao, setDataDevolucao] = React.useState("");

  React.useEffect(() => {

    const getLocacao = async () => {

      const locacao = await api.getLocacao(locacaoId);
      setLocacao(locacao)

      setStatus(locacao.status)
      setValorLocacao(locacao.valor)
      setDataLocacao(locacao.dataLocacao)
      setDataDevolucao(locacao.dataDevolucao)
    }

    getLocacao();

  }, [locacaoId]);

  const formatTempoLocacao = (dataLocacao, dataDevolucao) => {

    const diffInMs = new Date(dataDevolucao) - new Date(dataLocacao)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return `${diffInDays === 0 ? "1" : diffInDays} dia(s)`
   }

  const backButton = () => {
    navigate(-1);
  }

  const salvar = () => {

    
    Swal.fire({
      title: 'Tem certeza que quer editar essa locação?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.putLocacao(locacao.id, dataLocacao, dataDevolucao, Number(valorLocacao), status, locacao.automovel.id).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao editar locação',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            window.location.href = `/admin/locacoes/`
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você editou a locação com sucesso!',
              showConfirmButton: true,
              timer: 5000
            });
          }

        });
      } else if (result.isDenied) {
        Swal.close();
      }

    });
  }

  const handleStatus = (e) => {

    setStatus(e.target.value)
    console.log(status)

  }

  const handleValorLocacao = (e) => {

    setValorLocacao(e.target.value)
  }

  const handleDataLocacao = (e) => {

    setDataLocacao(e.target.value)
  }

  const handleDataDevolucao = (e) => {

    setDataDevolucao(e.target.value)
  }

  if(locacao === null) return null;

  return (

    <C.Container>
        <AdminSideBar width={360}/>

        <C.EditArea className="animeLeft">

        <Button className='backButton' onClick={backButton} style={{ height: '50px', width: '140px'}}>
          <C.ButtonAlign> <ArrowBackIosIcon style={{transform: 'scale(0.9)', marginRight: 20}}/> <span>Voltar</span> </C.ButtonAlign>
        </Button>

        <C.CardArea className='card'>
          
          <C.Area className="cardAlign">
          <C.FirstPart>
          <C.Wrapper>
            <span>Nome</span>
            <TextField 
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue={locacao.proprietario}
              variant="filled"
              className="inputSize space"
              InputProps={{readOnly: true}}
            />
          </C.Wrapper>
          <C.Wrapper>
            <span>Data de locação</span>
            <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              type='date'
              onChange={handleDataLocacao}
              value={dataLocacao}
            />
            </C.Wrapper>
            <C.Wrapper>
            <span>Data de devolução</span>
            <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              type='date'
              onChange={handleDataDevolucao}
              value={dataDevolucao}
            />
            </C.Wrapper>
       
       <C.Wrapper>
            <span style={{marginBottom: 10}}>Status</span>
       <select defaultValue={locacao.status}
         style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px"}}
         className="editSelect"
         onChange={handleStatus}
         >

          <option value="ATIVO" >ATIVO</option>
          <option value="DEVOLVIDO">DEVOLVIDO</option>
          <option value="PENDENTE">PENDENTE</option>
          <option value="REJEITADO">REJEITADO</option>
        </select>
        </C.Wrapper>

        </C.FirstPart>
        <C.SecondPart>

            
        <C.Wrapper>
            <span>Valor</span>
              <TextField className="inputSize space"
              hiddenLabel
              type="number"
              id="filled-hidden-label-small"
              variant="filled"
              onChange={handleValorLocacao}
              value={valorLocacao}
            />
          </C.Wrapper>

              <C.Wrapper>
              <span>Tempo</span>
              <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              defaultValue={`${formatTempoLocacao(locacao.dataLocacao, locacao.dataDevolucao)}`}
              InputProps={{readOnly: true}}
            />
            </C.Wrapper>

            <C.Wrapper>
              <span>Automóvel</span>
              <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              defaultValue={`${locacao.automovel.modelo.marca.nome} ${locacao.automovel.modelo.nome}`}
              InputProps={{readOnly: true}}
            />
            </C.Wrapper>

            <C.Wrapper>
              <span>Placa</span>
            <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              defaultValue={locacao.automovel.placa}
              InputProps={{readOnly: true}}
            />
             </C.Wrapper>

            </C.SecondPart>
            </C.Area>

          </C.CardArea>

          <Button className="button" onClick={salvar} variant="primary">Salvar alterações</Button>{' '}
          
        </C.EditArea>
    </C.Container>
  )
}

export default AdminEditLocation