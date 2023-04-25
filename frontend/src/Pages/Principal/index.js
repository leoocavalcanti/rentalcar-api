import React from 'react'
import * as C from './styles';
import { Container, Row, Col } from 'react-bootstrap';
import carImg from '../../Assets/carro-de-luxo.png';
import audi from '../../Assets/audi.png';
import bmw from '../../Assets/bmwpng.webp';
import mercedes from '../../Assets/mercedes.png';
import porsche from '../../Assets/porsche.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

const Principal = () => {
  return (
    <div style={{backgroundColor: '#1A202C', height: '100vh', paddingTop: 20}}>
      <div>
        <C.Container>
          <Container fluid>
            <Row className="justify-content-md-center">
              <C.DivH1><FontAwesomeIcon style={{transform: 'scale(0.8)', position: 'relative', top: 2}} icon={faCar}/> Locadora</C.DivH1>
            </Row>
          </Container>

          <C.ContentWrapper>
          <C.CardInfo style={{ width: '18rem', backgroundColor: 'aliceblue', border: 'none' }}>
            <C.CardDiv>
              <C.Title>Locadora de Carros</C.Title>
              <C.Text>
                Alugue seu carro na melhor locadora da região, com os <br></br>
                melhores preços e as melhores marcas apenas para você! <br></br>
                Cadastre-se agora e garanta seu carro!
              </C.Text>
              <Link to={'/login'}>
                <C.StyledButton variant="dark" style={{marginRight: '50px'}}>Login</C.StyledButton>
              </Link>
              <Link to={'/register'}>
                <C.StyledButton variant="primary">Cadastrar</C.StyledButton>
              </Link>
            </C.CardDiv>
          </C.CardInfo>
          <C.CardImg style={{ width: '18rem', backgroundColor: 'transparent', border: 'none'}}>
            <C.Img variant="top" src={carImg}/>
          </C.CardImg>
          </C.ContentWrapper>

          <Container fluid style={{marginTop: '90px', transform: 'scale(0.8)'}}>
            <Row className="justify-content-md-center">
              <Col className="text-center"><img alt="marca" src={audi} style={{ maxWidth: '100%', height: '200px', marginTop: '-45px' }} /></Col>
              <Col className="text-center"><img alt="marca" src={bmw} style={{ maxWidth: '100%' , height: '100px'}} /></Col>
              <Col className="text-center"><img alt="marca" src={mercedes} style={{ maxWidth: '100%', height: '120px'}} /></Col>
              <Col className="text-center"><img alt="marca" src={porsche} style={{maxWidth: '100%', height: '120px'}}></img></Col>
            </Row>
          </Container>
        </C.Container>
      </div>
    </div>
  )
}

export default Principal;