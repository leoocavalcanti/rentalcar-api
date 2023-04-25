import { TextField } from '@mui/material';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminSideBar from '../../Components/AdminSideBar';
import { api } from '../../Helpers/api';
import * as C from './styles';
import { Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';

const AdminEditUser = () => {


  const {usuarioId} = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = React.useState(null);
  const [usuarioRole, setUsuarioRole] = React.useState(null);
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [registroCnh, setRegistroCnh] = React.useState("");
  const [cep, setCep] = React.useState("");

  React.useEffect(() => {

    const getLocacao = async () => {

      const json = await api.getUsuario(usuarioId);
      setUsuario(json)
      
      setEmail(json.email)
      setDataNascimento(json.dataNascimento)
      setCpf(json.cpf)
      setRegistroCnh(json.registroCnh)
      setCep(json.cep)
      setNome(json.nome)
      
    }

    getLocacao();

  }, [usuarioId]);

  const backButton = () => {
    navigate(-1);
  }

  const salvar = () => {
    
    Swal.fire({
      title: 'Tem certeza que quer editar esse usuário?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.putUsuario(usuario.id, nome, email, senha, dataNascimento, cep, cpf, registroCnh).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao editar usuário',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            window.location.href = `/admin/clientes/`
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você editou o usuário com sucesso!',
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

  const handleEmail = (e) => {

    setEmail(e.target.value)
  }

  const handleNome = (e) => {

    setNome(e.target.value)
  }

  const handleSenha = (e) => {

    setSenha(e.target.value)
  }

  const handleRegistroCnh = (e) => {

    setRegistroCnh(e.target.value)
  }
  
  const handleCpf = (e) => {

    setCpf(e.target.value)
  }

  const handleCep = (e) => {

    setCep(e.target.value)
  }

  const handleDataNascimento = (e) => {

    setDataNascimento(e.target.value)
  }

  const handleAdminStatus = (e) => {

    let role = e.currentTarget.value
    setUsuarioRole(role)

    Swal.fire({
      title: 'Tem certeza que deseja alterar as permissões deste usuário?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.setAdmin(usuario.id).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao editar as permissões do usuário!',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            window.location.href = `/admin/clientes/${usuarioId}`
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você editou as permissões com sucesso!',
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

  React.useEffect(() => {

    const handleUserAdmin = () => {

      if(usuario && usuario.roles){

        usuario.roles.forEach((r) => r.authority === "ROLE_ADMIN" ? setUsuarioRole("SIM") : setUsuarioRole("NÃO"))

      }
  

    }
    handleUserAdmin();

  }, [usuario])



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
            <span>Nome</span>
            <TextField 
              hiddenLabel
              id="filled-hidden-label-small"
              onChange={handleNome}
              value={nome}
              variant="filled"
              className="inputSize space"
            />
          </C.Wrapper>
       
       <C.Wrapper>
            <span style={{marginBottom: 10}}>Usuário administrador</span>
       <select placeholder={usuarioRole}
         style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px", marginBottom: 10}}
         className="editSelect"
         onChange={handleAdminStatus}
         >
          <option value="">{usuarioRole}</option>
          {usuarioRole === "SIM" ? <option value="NÃO">NÃO</option> : <option value="SIM">SIM</option>}
        </select>
        </C.Wrapper>

        <C.Wrapper>
            <span>Email</span>
            <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              onChange={handleEmail}
              value={email}
            />
            </C.Wrapper>

        <C.Wrapper>
            <span>Senha</span>
            <TextField className="inputSize space"
              type="password"
              placeholder="********"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              onChange={handleSenha}
              value={senha}
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
          hiddenLabel
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
              onChange={handleDataNascimento}
              value={dataNascimento}
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
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
        />
        )}
      </InputMask>

          </C.Wrapper>

             <C.Wrapper>
              <span>Endereço</span>
            <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              defaultValue={`${usuario.endereco ? usuario.endereco.logradouro + " - " + usuario.endereco.localidade + ", " + usuario.endereco.uf : "Sem endereço"}`}
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

export default AdminEditUser