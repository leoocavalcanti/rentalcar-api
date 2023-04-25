import * as C from "./styles";
import React from 'react'
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Helpers/api';
import { Button } from 'react-bootstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';


const AdminRegisterUser = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = React.useState(null);
  const [nome, setNome] = React.useState("");
  const [registroCnh, setRegistroCnh] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");
  const id = window.localStorage.getItem("id");

  React.useEffect(() => {

    const handleUsuario = async () => {

      const json = await api.getUsuario(id);
      setUsuario(json);
      setNome(json.nome)
      setEmail(json.email)
      setDataNascimento(json.dataNascimento)
      setCpf(json.cpf)
      setCep(json.cep)
      setRegistroCnh(json.registroCnh)
    }

    handleUsuario();

  }, []);

  const backButton = () => {
    navigate(-1);
  }

  const salvar = () => {

    
    Swal.fire({
      title: 'Tem certeza que deseja salvar as alterações?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {

      if (result.isConfirmed) {
        await api.putUsuario(usuario.id, nome, email, senha, dataNascimento, cep, cpf, registroCnh).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao salvar as alterações',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você salvou as alterações com sucesso!',
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

  if(usuario === null) return null

  return (
    <C.Container>

        <Button className='backButton' onClick={backButton} style={{ height: '50px', width: '140px'}}>
          <C.ButtonAlign> <ArrowBackIosIcon style={{transform: 'scale(0.9)', marginRight: 20}}/> <span>Voltar</span> </C.ButtonAlign>
        </Button>

        <C.EditArea className="animeLeft">

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
              InputProps={{readOnly: true}}
              value={nome}
              variant="filled"
              className="inputSize space"
            />
          </C.Wrapper>
       
          <C.Wrapper>
            <span>E-mail</span>
            <TextField 
              hiddenLabel
              type="email"
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
              placeholder="*******"
              id="filled-hidden-label-small"
              onChange={handleSenha}
              value={senha}
              variant="filled"
              className="inputSize space"
            />
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
          InputProps={{readOnly: true}}
          id="filled-hidden-label-small"
          variant="filled"
        />
        )}
      </InputMask>

          </C.Wrapper>

          <C.Wrapper>
            <span>Data de nascimento</span>
            <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              type='date'
              InputProps={{readOnly: true}}
              onChange={handleDataNascimento}
              value={dataNascimento}
            />
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
          InputProps={{readOnly: true}}
          id="filled-hidden-label-small"
          variant="filled"
        />
        )}
      </InputMask>

          </C.Wrapper>

          <C.Wrapper>
            <span>Endereço</span>
            <TextField 
              hiddenLabel
              placeholder="Endereço"
              id="filled-hidden-label-small"
              defaultValue={`${usuario.endereco ? usuario.endereco.logradouro + " - " + usuario.endereco.localidade + ", " + usuario.endereco.uf : "Sem endereço"}`}
              variant="filled"
              InputProps={{readOnly: true}}
              className="inputSize space"
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

export default AdminRegisterUser