import styled from 'styled-components';

export const Container = styled.div`

  height: 100px;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1A202C;
  box-shadow: 0 0 8px 1px;
  width: 100vw;
  
  a{
    text-decoration: none;
  }

  img{

    width: 40px;
    position: relative;
    top: -2px;
    height: auto;
  }

  > svg {
    color: white;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

export const UserInfo = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;

  h4{

    color: #fff;
    font-size: 19px;
    text-align: center;
    margin-left: 10px;
    position: relative;
    top: 3px;
  }

  img{
    
    width: 19px;
    height: auto;
  }

  &:hover{

    opacity: 0.9;
    cursor: pointer;
    transition: 0.3s;
  }
`