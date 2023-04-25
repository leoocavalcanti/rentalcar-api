import styled from "styled-components";
import { Button, Carousel, Col } from 'react-bootstrap';
export const Container = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

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

export const EditArea = styled.div`

    .inputSize{

        width: 400px;
        margin: 10px 0;
    }

    width: 100%;
    display: flex;
    margin-top: -100px;
    justify-content: center;
    flex-direction: column;

    .custom-card {
    width: 600px;
    margin: 0 auto;
    }



`

export const ColWrapped = styled(Col)`
    margin-top: 30px;
    padding-left: 100px;
    /* margin-left: 150px; */
`

export const Div = styled.div `
    /* display: 'flex'; */
    /* justify-content: 'center'; */
    /* align-items: 'center'; */
    /* width: 700; */
    /* padding: 30; */
    /* margin-left: 'auto'; */
    /* margin-right: 'auto'; */
`

export const Card = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-left: 2rem;
    width: 360px;
    /* height: 370px; */
    margin-top: 6rem;
    box-shadow: 0 0 6px #33333370;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s ease;

    :hover{
        transform: scale(1.05);
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

        font-size: 18px;
        font-weight: bold;
        
    }

    display: flex;
    flex-direction: column;

    a{

        padding: 12px 30px;
        margin-top: 33px;
        width: 330px !important;
        color: #fff;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        background-image: linear-gradient(to right, #1A202C , #363152);
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

export const ButtonAlign = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;


`

export const ButtonReturned = styled(Button) `
    padding: 10px 30px;
    margin-top: 35px;
    border: none;
    width: 360px !important;
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    background-image: linear-gradient(to right, #814DDE , #814DDE );
    width: 100%;

`

export const ButtonPending = styled(Button) `
    padding: 10px 30px;
    margin-top: 35px;
    border: none;
    width: 360px !important;
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    background-image: linear-gradient(to right, #d69500 , #d69500 );
    width: 100%;
`

export const ButtonToReturn = styled(Button) `
    padding: 10px 30px;
    margin-top: 35px;
    width: 360px !important;
    background-image: linear-gradient(to right, #1A202C , #363152);
    border: none;
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    width: 100%;
`

export const ButtonRejected = styled(Button) `
    padding: 10px 30px;
    margin-top: 35px;
    border: none;
    width: 360px !important;
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    background-image: linear-gradient(to right, #D3232F , #D3232F );
    width: 100%;
`