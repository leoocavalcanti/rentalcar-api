import styled from "styled-components";


export const Container = styled.div`

    display: flex;

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

    .editSelect{
        width: 400px;
        padding: 12px;
       
    }
    
    .button{

        width: 150px;
        padding: 10px;
        margin: 0 auto;
        margin-top: 1rem;
        background-color: #1D2950;
        transform: scale(0.90);
        border: 0;
    }

    .space{

        transform: scale(0.90);
    
    }


`

export const CardArea = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 0;
    width: 50vw;
    margin: 0 auto;

`

export const Area = styled.div`

    display: flex;


`
export const Wrapper = styled.div`

    display: flex;
    flex-direction: column;

    span{

        margin-left: 20px;
        font-size: 15px;
        color: #222;
    }

`


export const FirstPart = styled.div`


`

export const SecondPart = styled.div`


`