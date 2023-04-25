import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { api } from '../../Helpers/api'
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate();

  React.useEffect(() => {

    const token = window.localStorage.getItem("token");
    if(token){

      navigate("/home")
    }

  })

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleLogin = async (username, password) => {

    setLoading(true);
    const json = await api.doLogin(username, password);

    if(json.nome){

      window.localStorage.setItem("token", json.access_token);
      window.localStorage.setItem("id", json.id);
      window.location.href = '/home';
      setError(null);
    } else {
      setError("As credenciais de login são inválidas!");
      toast.error(error)
   }

   setLoading(false);
  }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Entre com sua conta!</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Senha"
                        autoComplete="current-password"
                        value={senha} onChange={(e) => setSenha(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {loading ? <CButton disabled color="primary" className="px-4" onClick={() => handleLogin(email, senha)}> 
                          Carregando...
                        </CButton>
                        :
                        <CButton color="dark" className="px-4" onClick={() => handleLogin(email, senha)}> 
                          Login
                        </CButton>
                        }
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-4" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Cadastro</h2>
                    <p>
                      Ainda não possui um cadastro? Clique no botão abaixo para criar sua nova conta.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Cadastrar
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
