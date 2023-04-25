import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';

export const Container = styled.div`
  width: 80rem;
  max-height: 90vh;
  border-radius: 2%;
  background-color: aliceblue;
  margin: 0 auto;
  transform: scale(0.95);
  margin-top: 30px;

  @media (max-width: 600px) {
    transform: scale(0.85);
}
`

export const DivH1 = styled(Col)`
  margin: 0 auto;
  margin-left: 15px;
  margin-top: 15px;
  font-weight: bold;
  font-size: 35px;
`

export const CardDiv = styled.div`
  margin-top: 140px;
  margin-left: 30px;
  width: 600px;
`

export const CardInfo = styled(Card)`
  width: '18rem';
  height: 50vh;
  background-color: 'aliceblue';
  border: none;
`

export const ContentWrapper = styled.div`
 


`

export const CardImg = styled(Card)`

  transform: scale(1.09);
  margin-top: -28rem;
  padding-bottom: 2rem;
  margin-left: 620px;
  width: '18rem';
  border: none;
`

export const Title = styled(Card.Title) `
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  font-size: 50px;
`

export const Img = styled(Card.Img) `

  width: 700px;
  height: auto;
`

export const Text = styled(Card.Text) `
  margin-top: auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 17px;
`

export const StyledButton = styled(Button)`
  margin-top: 20px;
  width: 125px;
  height: 50px;
  font-size: 20px;
`