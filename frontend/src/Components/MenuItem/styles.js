import styled from "styled-components"

export const LinkArea = styled.a(({active}) => (

    `

    display: block;
    width: 60px;
    height: 60px;
    background-color: ${active ? "#22222230" : ""};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;


    `


))


export const LinkIcon = styled.img`

    width: 34px;
    height: auto;
    align-self: center;
    position: fixed;

`