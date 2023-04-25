import * as C from "./styles";
import React from 'react'
import { TextField } from '@mui/material';
import { api } from '../../Helpers/api';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import AdminSideBar from "../../Components/AdminSideBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";


const AdminRegisterMarca = () => {

  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const navigate = useNavigate();

  const salvar = () => {

    
    Swal.fire({
      title: 'Tem certeza que deseja cadastrar essa marca?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Cadastrar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {

      if(nome === "" || descricao === ""){

        toast.error("Preencha todos os campos")
        return
      }

      if (result.isConfirmed) {
        await api.postMarca(nome, descricao).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao cadastrar a marca',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você cadastrou a marca com sucesso!',
              showConfirmButton: true,
              timer: 5000
            });
            window.location.href="/admin/marcas"
          }

        });
      } else if (result.isDenied) {
        Swal.close();
      }

    });
  }

  const handleNome = (e) => {

    setNome(e.target.value)
  }

  const handleDescricao = (e) => {

    setDescricao(e.target.value)
  }

  const backButton = () => {
    navigate(-1);
  }



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
            <span>Nome da marca</span>
            <TextField className="inputSize space"
              placeholder="Nome - exemplo: Fiat"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              type='text'
              onChange={handleNome}
              value={nome}
            />
            </C.Wrapper>
            <C.Wrapper>
            <span>Descrição</span>
            <TextField className="inputSize space"
              placeholder="Breve descrição da marca"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              type='text'
              onChange={handleDescricao}
              value={descricao}
            />
            </C.Wrapper>

            </C.FirstPart>
            

           
            </C.Area>

            <Button className="button" onClick={salvar} variant="primary">Cadastrar marca</Button>{' '}

          </C.CardArea>
          
        </C.EditArea>
    </C.Container>
  )
}

export default AdminRegisterMarca