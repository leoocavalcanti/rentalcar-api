import styled from "styled-components";
import { Carousel, Col } from 'react-bootstrap';

export const ColWrapped = styled(Col)`
    margin-top: 30px;
    padding-left: 100px;
    /* margin-left: 150px; */
`

export const Div = styled.div `
   
   max-width: 900px;
`

export const Wrapper = styled.div `
    
    display: flex;
    margin-left: -280px;

`

export const Container = styled.div `

    max-width: 960px;
    margin: 0 auto;



`

export const Card = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 330px;
    height: 370px;
    margin-top: 4rem;
    margin-left: 2rem;
    box-shadow: 0 0 6px #33333370;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s ease;

    :hover{

        transform: scale(1.05);
        
    }


`
export const AreaSuperior = styled.div`

    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 0 auto;
    margin-top: 30px;

    .button{

    width: 170px;
    transition: 0.2s ease;

    &:hover{

        transform: scale(1.03);
    }
    }
    

    .searchBar{

    width: 600px;
    margin-top: 20px;
    margin-left: -45px;


    }

    


`

export const ButtonGroup = styled.div`

    position: relative;
    left: -10px;
    top: 30px;
    display: flex;
    justify-content: space-between;

    
    .buttonColor{

    color: #fff;
    border: 0;
    background-color: #1D2950;
    transition: 0.2s ease;
    transform: scale(0.95);

        &:hover{

            transform: scale(1);
        }
    }
`


export const InfoArea = styled.div`


    img{

        width: 240px;
        height: 160px;
    }
`


export const Icons = styled.div`

    display: flex;
    


`

export const VehicleArea = styled.div`


    h4{

        margin-top: 10px;
        text-align: center;
        font-weight: bold;
        font-size: 23px;
    }

    span{

        font-size: 22px;
        font-weight: bold;
        
    }

    display: flex;
    flex-direction: column;

    a{

        padding: 12px 30px;
        margin-top: 33px;
        border-radius: 6px;
        width: 330px !important;
        background-image: linear-gradient(to right, #1A202C , #363152);
        border: none;
        color: #fff;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        width: 100%;
    }

    button{

        padding: 10px 30px;
        margin-top: 33px;
        border-radius: 6px;
        width: 330px !important;
        color: #fff;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        background-image: linear-gradient(to right, #B71C1C , #A31A2C );
        width: 100%;

    }

`

export const Adjust = styled.div`

    margin-left: 2.3rem;

`

export const RatingArea = styled.div`


    display: flex;
    
    p{

        font-size: 12px;
        color: #bbb;
        font-weight: bold;
        position: relative;
        margin-top: 3px;
        margin-left: 3px;
    }

`

export const StyledCarousel = styled(Carousel) `
    width:900px;
    height:500px;
    margin: auto;
`