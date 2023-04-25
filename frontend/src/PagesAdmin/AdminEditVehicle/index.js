import { TextField } from '@mui/material';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminSideBar from '../../Components/AdminSideBar';
import { api } from '../../Helpers/api';
import * as C from './styles';
import { Button } from 'react-bootstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AdminEditVehicle = () => {


  const {automovelId} = useParams();
  const navigate = useNavigate();

  const [automovel, setAutomovel] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [valorAutomovel, setValorAutomovel] = React.useState("");
  const [diaria, setDiaria] = React.useState("");
  const [placa, setPlaca] = React.useState("");

  React.useEffect(() => {

    const getLocacao = async () => {

      const automovel = await api.getAutomovel(automovelId);
      setAutomovel(automovel)
      
      setStatus(automovel.status)
      setValorAutomovel(automovel.valorAutomovel)
      setDiaria(automovel.diaria)
      setPlaca(automovel.placa)
      
    }

    getLocacao();

  }, [automovelId]);

  const backButton = () => {
    navigate(-1);
  }

  const salvar = () => {
    
    Swal.fire({
      title: 'Tem certeza que quer editar esse automóvel?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {

      if(valorAutomovel === "" || status === "" || diaria === "" || placa === ""){

        toast.error("Preencha todos os campos");
        return;
      }

      if (result.isConfirmed) {
        await api.putAutomovel(automovel.id, valorAutomovel, status, diaria, placa, automovel.modelo.id).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao editar o automóvel',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            window.location.href = `/admin/automoveis/`
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você editou o automóvel com sucesso!',
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

  const handleStatus = (e) => {

    setStatus(e.target.value)

  }

  const handleValorAutomovel = (e) => {

    setValorAutomovel(e.target.value)
  }

  const handlePlaca = (e) => {

    setPlaca(e.target.value)
  }

  const handleDiaria = (e) => {

    setDiaria(e.target.value)
  }

  if(automovel === null) return null;

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
            <span>Nome</span>
            <TextField 
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue={`${automovel.modelo.marca.nome} ${automovel.modelo.nome}`}
              variant="filled"
              className="inputSize space"
              InputProps={{readOnly: true}}
            />
          </C.Wrapper>
          <C.Wrapper>
            <span>Valor automóvel (tabela FIPE)</span>
            <TextField className="inputSize space"
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
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              onChange={handlePlaca}
              value={placa}
            />
            </C.Wrapper>
       
       <C.Wrapper>
            <span style={{marginBottom: 10}}>Status</span>
       <select defaultValue={automovel.status}
         style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px"}}
         className="editSelect"
         onChange={handleStatus}
         >
          <option value="DISPONIVEL">DISPONIVEL</option>
          <option value="INDISPONIVEL">INDISPONIVEL</option>
        </select>
        </C.Wrapper>

        </C.FirstPart>
        <C.SecondPart>
            
        <C.Wrapper>
            <span>Diária</span>
              <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              onChange={handleDiaria}
              value={diaria}
            />
          </C.Wrapper>


              <C.Wrapper>
              <span>Categoria</span>
              <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              defaultValue={automovel.modelo.categoria}
              InputProps={{readOnly: true}}
            />
            </C.Wrapper>

            <C.Wrapper>
              <span>Câmbio</span>
              <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              defaultValue={automovel.modelo.cambio}
              InputProps={{readOnly: true}}
            />
            </C.Wrapper>

            <C.Wrapper>
              <span>Portas</span>
            <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              defaultValue={automovel.modelo.portas + " portas"}
              InputProps={{readOnly: true}}
            />
             </C.Wrapper>

            </C.SecondPart>
            </C.Area>

          </C.CardArea>

          <Button className="button" onClick={salvar} variant="primary">Salvar alterações</Button>{' '}
          
        </C.EditArea>
    </C.Container>
  )
}

export default AdminEditVehicle