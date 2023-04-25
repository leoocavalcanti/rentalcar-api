import { TextField } from '@mui/material';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminSideBar from '../../Components/AdminSideBar';
import { api } from '../../Helpers/api';
import * as C from './styles';
import { Button } from 'react-bootstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';

const AdminEditMarca = () => {


  const {marcaId} = useParams();
  const navigate = useNavigate();

  const [marca, setMarca] = React.useState(null);
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");

  React.useEffect(() => {

    const getMarca = async () => {

      const marca = await api.getMarca(marcaId);
      setMarca(marca)
      setNome(marca.nome)
      setDescricao(marca.descricao)
    }

    getMarca();

  }, [marcaId]);

  const backButton = () => {
    navigate(-1);
  }

  const salvar = () => {

    
    Swal.fire({
      title: 'Tem certeza que quer editar essa marca?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.putMarca(marca.id, nome, descricao).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao editar a marca',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            window.location.href = `/admin/marcas/`
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você editou a marca com sucesso!',
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

  const handleNome = (e) => {

    setNome(e.target.value)

  }

  const handleDescricao = (e) => {

    setDescricao(e.target.value)
  }


  if(marca === null) return null;

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
    <span>Nome da marca</span>
    <TextField className="inputSize space"
      hiddenLabel
      id="filled-hidden-label-small"
      variant="filled"
      type='text'
      onChange={handleNome}
      value={nome}
    />
    </C.Wrapper>
    <C.Wrapper>
    <span>Descrição</span>
    <TextField className="inputSize space"
      hiddenLabel
      id="filled-hidden-label-small"
      variant="filled"
      type='text'
      onChange={handleDescricao}
      value={descricao}
    />
    </C.Wrapper>

    </C.FirstPart>
    

   
    </C.Area>

    <Button className="button" onClick={salvar} variant="primary">Salvar alterações</Button>{' '}

  </C.CardArea>
  
</C.EditArea>

    </C.Container>
  )
}

export default AdminEditMarca