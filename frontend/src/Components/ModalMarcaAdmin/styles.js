import styled from 'styled-components';

export const Container = styled.div`
    
    width: 100%;
    display: flex;

    .animeLeft{

    animation: anime .3s forwards;
    }

    @keyframes anime{

    from{

        transform: translateX(-20px);
        opacity: 0;
    }

    to{

        transform: initial;
        opacity: initial;
    }
    }

    .editSelect{

        width: 20px;
        background-color: transparent;
        outline: 0;
        border: 0;

    }

  
`
export const ButtonGroup = styled.div`

    position: relative;
    top: 20px;
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

export const AreaSuperior = styled.div`

    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 40px;

    .button{

    width: 170px;
    transition: 0.2s ease;

    &:hover{

        transform: scale(1.03);
    }
    }
    

    .searchBar{

    width: 400px;

    }

    


`

export const Adjust = styled.div`

    width: 80%;
    position: relative;
    margin: 0 auto;

    .center{

        position: relative;
        margin-top: 40px;
        box-shadow: 0 0 30px #22222240;
    }
`

export const AdjustControllers = styled.div`

    margin-right: -10px;

`

export const StatusArea = styled.div`

    display: flex;

`