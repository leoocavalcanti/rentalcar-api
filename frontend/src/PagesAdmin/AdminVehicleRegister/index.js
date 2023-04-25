import * as C from "./styles";
import React from 'react'
import AdminSideBar from "../../Components/AdminSideBar";
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Helpers/api';
import { Button } from 'react-bootstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';

const AdminVehicleRegister = () => {

  const navigate = useNavigate();

  const [automovel, setAutomovel] = React.useState(null);
  const [modelo, setModelo] = React.useState(null);
  const [valorAutomovel, setValorAutomovel] = React.useState("");
  const [modeloId, setModeloId] = React.useState(1);
  const [placa, setPlaca] = React.useState("");

  React.useEffect(() => {

    const handleAutomoveis = async () => {

      const json = await api.getAllAutomoveis();
      console.log(json)
      setAutomovel(json);

    }

    handleAutomoveis();

  }, []);

  React.useEffect(() => {

    const handleModelos = async () => {

      const json = await api.getAllModelos();
      setModelo(json);

    }

    handleModelos();

  }, [])

  const backButton = () => {
    navigate(-1);
  }

  const salvar = () => {

    
    Swal.fire({
      title: 'Tem certeza que deseja cadastrar esse automóvel?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Cadastrar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.postAutomovel(Number(valorAutomovel), placa.toUpperCase(), modeloId).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao cadastrar o automóvel',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você cadastrou o automóvel com sucesso!',
              showConfirmButton: true,
              timer: 5000
            });
          }

        });
      } else if (result.isDenied) {
        Swal.close();
      }

    });
  }

  const handlePlaca = (e) => {

    setPlaca(e.target.value)
  }

  const handleValorAutomovel = (e) => {

    setValorAutomovel(e.target.value)
  }

  const handleModeloId = (e) => {

    setModeloId(e.currentTarget.value)
  }

  if(automovel === null) return null;
  if(modelo === null) return null;

  return (
    <C.Container>

    <AdminSideBar width={360}/>

    <C.EditArea className="animeLeft">

    <Button className='backButton' onClick={backButton} style={{ height: '50px', width: '140px'}}>
      <C.ButtonAlign> <ArrowBackIosIcon style={{transform: 'scale(0.9)', marginRight: 20}}/> <span>Voltar</span> </C.ButtonAlign>
    </Button>

    <C.CardArea className='card'>
      
      <C.Area className="cardAlign">
      <C.FirstPart>
      <C.Wrapper>
            <span>Valor automóvel (tabela FIPE)</span>
            <TextField className="inputSize space"
              type="number"
              placeholder="Digite o valor avaliado do automóvel"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              onChange={handleValorAutomovel}
              value={valorAutomovel}
            />
            </C.Wrapper>
            <C.Wrapper>
            <span>Placa</span>
            <TextField className="inputSize space"
              placeholder="Placa padrão mercosul, exemplo: ACS5C49"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              onChange={handlePlaca}
              value={placa}
            />
            </C.Wrapper>
   
   <C.Wrapper>
    <span style={{marginBottom: 10}}>Modelo</span>
   <select
     style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px", marginBottom: '10px'}}
     className="editSelect space"
     onChange={handleModeloId}
     >
      {modelo.content.map((m) => (

      <>
        <option value={m.id}>{`${m.marca.nome} ${m.nome}`}</option>
      </>

      ))}
    </select>
    </C.Wrapper>

        </C.FirstPart>
        

       
        </C.Area>

      </C.CardArea>

      <Button className="button" onClick={salvar} variant="primary">Cadastrar automóvel</Button>{' '}
      
    </C.EditArea>
</C.Container>
  )
}

export default AdminVehicleRegister;