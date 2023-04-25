import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    right: 120px;

    .backButton{

    position: fixed;
    z-index: 1;
    transform: scale(0.85);
    top: 120px;
    left: 20px;
    background-color: #1D2950;
    border: 0;
    }

`

export const ButtonAlign = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;


`


export const Text = styled.div`

    z-index: -1;
    position: relative;
    text-align: center;

`

export const Button = styled.div`

    .button{

    width: 160px;
    padding: 10px;
    margin: 0 auto;
    margin-top: 1rem;
    background-color: #1D2950;
    transform: scale(0.90);
    border: 0;
    }


`