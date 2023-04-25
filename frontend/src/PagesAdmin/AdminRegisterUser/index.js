import * as C from "./styles";
import React from 'react'
import AdminSideBar from "../../Components/AdminSideBar";
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Helpers/api';
import { Button } from 'react-bootstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';


const AdminRegisterUser = () => {

  const navigate = useNavigate();

  const [nome, setNome] = React.useState("");
  const [registroCnh, setRegistroCnh] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");

  const backButton = () => {
    navigate(-1);
  }

  const salvar = () => {

    
    Swal.fire({
      title: 'Tem certeza que deseja cadastrar esse usuário?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Cadastrar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {

      if (result.isConfirmed) {
        await api.registerUser(nome, cpf, cep, email, dataNascimento, registroCnh, senha).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao cadastrar o usuário',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você cadastrou o usuário com sucesso!',
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

  const handleNome = (e) => {

    setNome(e.target.value)
  }

  const handleRegistroCnh = (e) => {

    setRegistroCnh(e.target.value)
  }

  const handleCep = (e) => {

    setCep(e.currentTarget.value)
  }

  const handleCpf = (e) => {

    setCpf(e.currentTarget.value)
  }

  const handleSenha = (e) => {

    setSenha(e.currentTarget.value)
  }

  const handleEmail = (e) => {

    setEmail(e.currentTarget.value)
  }

  const handleDataNascimento = (e) => {

    setDataNascimento(e.target.value)
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
            <span>Nome</span>
            <TextField 
              hiddenLabel
              placeholder="Nome"
              id="filled-hidden-label-small"
              onChange={handleNome}
              value={nome}
              variant="filled"
              className="inputSize space"
            />
          </C.Wrapper>
       
          <C.Wrapper>
            <span>E-mail</span>
            <TextField 
              hiddenLabel
              placeholder="E-mail"
              id="filled-hidden-label-small"
              onChange={handleEmail}
              value={email}
              variant="filled"
              className="inputSize space"
            />
          </C.Wrapper>

          <C.Wrapper>
            <span>Senha</span>
            <TextField 
              hiddenLabel
              type="password"
              placeholder="Senha"
              id="filled-hidden-label-small"
              onChange={handleSenha}
              value={senha}
              variant="filled"
              className="inputSize space"
            />
          </C.Wrapper>
          
          <C.Wrapper>
            <span>Data de nascimento</span>
            <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              type='date'
              onChange={handleDataNascimento}
              value={dataNascimento}
            />
            </C.Wrapper>

          </C.FirstPart>
          <C.SecondPart>

          <C.Wrapper>
            <span>CPF</span>
        <InputMask
        mask='999.999.999-99'
        value={cpf}
        onChange={handleCpf}>
        {() => (
          <TextField className="inputSize space"
          placeholder="CPF"
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
        />
        )}
      </InputMask>

          </C.Wrapper>

          <C.Wrapper>
            <span>CEP</span>
        <InputMask
        mask='99999999'
        value={cep}
        onChange={handleCep}>
        {() => (
          <TextField className="inputSize space"
          placeholder="CEP"
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
        />
        )}
      </InputMask>

          </C.Wrapper>

          <C.Wrapper>
            <span>Registro CNH</span>
        <InputMask
        mask='99999999999'
        value={registroCnh}
        onChange={handleRegistroCnh}>
        {() => (
          <TextField className="inputSize space"
          placeholder="Número CNH"
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
        />
        )}
      </InputMask>

          </C.Wrapper>


          </C.SecondPart>

           
            </C.Area>

          </C.CardArea>

          <Button className="button" onClick={salvar} variant="primary">Cadastrar usuário</Button>{' '}
          
        </C.EditArea>
    </C.Container>
  )
}

export default AdminRegisterUser