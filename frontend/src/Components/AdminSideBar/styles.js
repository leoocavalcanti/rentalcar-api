import styled from 'styled-components';

  export const Container = styled.div(({width}) => (


`

    height: 100vh;
    width: ${width}px;
    background-color: #171923;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 8px 1px;

    a{

    text-decoration: none;
    width: 100%;
    color: #FFF;

    }


`


))

export const ManagerArea = styled.div(({location, link}) => (


  `

    background-color: ${link === location ? "#1D2950" : ""};
    padding: 30px 0;
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: #fff;

    &:hover{

      background-color: #1D2950;
      transition: 0.4s;
    }

    span{

      text-decoration: none;
    }

  `

))

