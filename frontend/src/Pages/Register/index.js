import React from 'react'
import * as C from "./styles"
import {
  Button,
  Card,
  Form,
} from 'react-bootstrap';
import { RegisterH1, Cards, Label } from './styles';
import CPFInput from '../../Components/InputCPF';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../Helpers/api';
import { toast } from 'react-toastify';
import CEPInput from '../../Components/InputCEP';
import CNHInput from '../../Components/InputCNH';

const Register = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) {
      navigate('/home');
    }
  });


  const [nome, setNome] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [registroCnh, setRegistroCnh] = React.useState('');
  const [dataNascimento, setDataNascimento] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [cep, setCep] = React.useState('');
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (nome, cpf, cep, email, dataNascimento, registroCnh, senha) => {

    setLoading(true);

    if(nome === "" || cpf === "" || email === "" || senha === "" || cep === "" || dataNascimento === "" || registroCnh === ""){

      toast.error("Preencha todos os campos!");
      setLoading(false);
      return;
    }

    const json = await api.registerUser(nome, cpf, cep, email, dataNascimento, registroCnh, senha);
    console.log(json)

    if (json.nome) {

      setError(null);
      toast.success("Cadastro realizado com sucesso")

        setTimeout(() => {

        window.location.href = '/login';

      }, 2000);
      
    } else {
      
      setError("Seus dados estão incorretos ou já existe um usuário com esses dados");
      toast.error(error);
    }

    setLoading(false);
  }

  return (
 
    <C.Align>
      <Cards style={{borderRadius: "5px"}}>
        <Card.Body className="bg-primary py-4">
          <RegisterH1><h3>Cadastre-se agora e garanta seu carro!</h3></RegisterH1>
          <Label htmlFor="nameInput">Nome</Label>
          <Form.Control
            type="text"
            id="nameInput"
            aria-describedby="nameTextInput"
            placeholder='Digite seu nome'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <br></br>
          <Label htmlFor="emailInput">E-mail</Label>
          <Form.Control
            type="email"
            id="emailInput"
            aria-describedby="emailTextInput"
            placeholder='Digite seu e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <Label htmlFor="inputPassword">Senha</Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordTextInput"
            placeholder='Digite sua senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <br></br>
          <Label htmlFor="emailInput">Data de nascimento</Label>
          <Form.Control
            type="date"
            id="dateInput"
            aria-describedby="dateTextInput"
            placeholder=''
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
          <br></br>
          <Label htmlFor="cpfInput">CPF</Label>
          <CPFInput value={cpf} onChange={(e) => setCpf(e.target.value)}/>
          <br></br>
          <Label htmlFor="cpfInput">Número de registro CNH</Label>
          <CNHInput value={registroCnh} onChange={(e) => setRegistroCnh(e.target.value)}/>
          <br></br>
          <Label htmlFor="cpfInput">CEP</Label>
          <CEPInput value={cep} onChange={(e) => setCep(e.target.value)}/>
          <Card.Text></Card.Text>
          {loading ?
           <Button variant="primary" disabled style={{ marginTop: '10px'}}>Carregando...</Button>
           :
          <Button variant="dark" onClick={() => handleRegister(nome, cpf, cep, email, dataNascimento, registroCnh, senha)} style={{ marginTop: '10px'}}>Cadastrar</Button>
          }
          <Link to={'/login'}>
            <Button style={{ marginTop: '10px', marginLeft: '10px' }} variant="primary">Já possuo login</Button>
          </Link>
        </Card.Body>
      </Cards>
      </C.Align>
   

  );
}

export default Register;