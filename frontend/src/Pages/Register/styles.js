import styled from 'styled-components';
import { Card, Container, Form } from 'react-bootstrap';

export const RegisterH1 = styled.h1`
    margin-bottom: 30px;
    color: aliceblue;
`;

export const Cards = styled(Card)`

    margin: 0 auto;
    transform: scale(0.93);
    width: 600px;
`


export const Align = styled.div`

    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #EBEDEF;
`

export const Grid = styled(Container)`
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    display: flex;
`

export const Label = styled(Form.Label)`
    color: aliceblue;
`

