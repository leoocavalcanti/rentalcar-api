import * as C from "./styles";
import React from 'react'
import AdminSideBar from "../../Components/AdminSideBar";
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Helpers/api';
import { Button } from 'react-bootstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';


const AdminRegisterLocation = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = React.useState(null);
  const [automovel, setAutomovel] = React.useState(null);
  const [automovelId, setAutomovelId] = React.useState(1);
  const [usuarioId, setUsuarioId] = React.useState(1);
  const [dataLocacao, setDataLocacao] = React.useState("");
  const [dataDevolucao, setDataDevolucao] = React.useState("");

  React.useEffect(() => {

    const handleAutomoveis = async () => {

      const json = await api.getAllAutomoveis();
      console.log(json)
      setAutomovel(json);

    }

    handleAutomoveis();

  }, []);

  React.useEffect(() => {

    const handleUsuarios = async () => {

      const json = await api.getAllUsuarios();
      setUsuario(json);

    }

    handleUsuarios();

  }, [])

  const backButton = () => {
    navigate(-1);
  }

  const salvar = () => {

    
    Swal.fire({
      title: 'Tem certeza que deseja cadastrar essa locação?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Cadastrar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {

      if(usuarioId === ""){

        setUsuarioId(1);
      }

      if(automovelId === ""){

        setAutomovelId(1);
      }

      if (result.isConfirmed) {
        await api.postLocacao(dataLocacao, dataDevolucao, automovelId, usuarioId).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao cadastrar a locação',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você cadastrou a locação com sucesso!',
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

  const handleDataLocacao = (e) => {

    setDataLocacao(e.target.value)
  }

  const handleAutomovelId = (e) => {

    setAutomovelId(e.target.value)
  }

  const handleUsuarioId = (e) => {

    setUsuarioId(e.currentTarget.value)
  }

  const handleDataDevolucao = (e) => {

    setDataDevolucao(e.target.value)
  }

  if(automovel === null) return null;
  if(usuario === null) return null;

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
        <span style={{marginBottom: 10}}>Automóvel</span>
       <select
         style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px", marginBottom: '10px'}}
         className="editSelect space"
         onChange={handleAutomovelId}
         >
          {automovel.content.map((a) => (

          <>
            <option value={a.id}>{`${a.modelo.marca.nome} ${a.modelo.nome} (${a.status === "DISPONIVEL" ? "Disponível" : "Indisponível"})`}</option>
          </>

          ))}
        </select>
        </C.Wrapper>

        <C.Wrapper>
        <span style={{marginBottom: 10}}>Usuário</span>
       <select
         style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px", marginBottom: '10px'}}
         className="editSelect space"
         onChange={handleUsuarioId}
         >
          {usuario.content.map((u) => (

          <>
            <option value={u.id}>{`ID ${u.id} - ${u.nome}`}</option>
          </>

          ))}
        </select>
        </C.Wrapper>

            </C.FirstPart>
            

           
            </C.Area>

          </C.CardArea>

          <Button className="button" onClick={salvar} variant="primary">Cadastrar locação</Button>{' '}
          
        </C.EditArea>
    </C.Container>
  )
}

export default AdminRegisterLocation