import { TextField } from '@mui/material';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminSideBar from '../../Components/AdminSideBar';
import { api } from '../../Helpers/api';
import * as C from './styles';
import { Button } from 'react-bootstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';

const AdminEditModelo = () => {


  const {modeloId} = useParams();
  const navigate = useNavigate();
  
  const [modelo, setModelo] = React.useState(null);
  const [marca, setMarca] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [cambio, setCambio] = React.useState(1);
  const [categoria, setCategoria] = React.useState(1);
  const [imagem, setImagem] = React.useState("");
  const [portas, setPortas] = React.useState("");
  const [ano, setAno] = React.useState("");

  React.useEffect(() => {

    const getMarca = async () => {

      const modelo = await api.getModelo(modeloId);
      setModelo(modelo)
      setMarca(modelo.marca)
      setNome(modelo.nome)
      setDescricao(modelo.descricao)
      setCambio(modelo.cambio)
      setCategoria(modelo.categoria)
      setImagem(modelo.imagem)
      setPortas(modelo.portas)
      setAno(modelo.ano)
    }

    getMarca();

  }, [modeloId]);

  const backButton = () => {
    navigate(-1);
  }

  const salvar = () => {

    
    Swal.fire({
      title: 'Tem certeza que quer editar esse modelo?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.putModelo(modelo.id, nome, descricao, categoria, cambio, imagem, portas, ano).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao editar o modelo',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            window.location.href = `/admin/modelos/`
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você editou o modelo com sucesso!',
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

  const handleCambio = (e) => {

    let cambio = e.currentTarget.value
    setCambio(cambio)
  }

  const handleCategoria = (e) => {

    let categoria = e.currentTarget.value
    setCategoria(categoria)
  }

  const handleImagem = (e) => {

    setImagem(e.target.value)
  }

  const handlePortas = (e) => {

    setPortas(e.target.value)
  }

  const handleAno = (e) => {

    setAno(e.target.value)
  }


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
            <span>Nome</span>
            <TextField 
              hiddenLabel
              id="filled-hidden-label-small"
              value={nome}
              onChange={handleNome}
              variant="filled"
              className="inputSize space"
            />
          </C.Wrapper>
          <C.Wrapper>
            <span>Descrição</span>
            <TextField 
              hiddenLabel
              id="filled-hidden-label-small"
              value={descricao}
              onChange={handleDescricao}
              variant="filled"
              className="inputSize space"
            />
          </C.Wrapper>
          <C.Wrapper>
            <span style={{marginBottom: 10}}>Categoria</span>
       <select defaultValue={modelo.categoria}
         style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px", marginBottom: 10}}
         className="editSelect"
         onChange={handleCategoria}
         >

            <option value="COMPACTO">COMPACTO</option>
            <option value="SEDAN">SEDAN</option>
            <option value="SUV">SUV</option>
            <option value="CAMINHONETE">CAMINHONETE</option>
            <option value="ESPORTIVO">ESPORTIVO</option>
            <option value="CONVERSIVEL">CONVERSIVEL</option>    
        </select>
        </C.Wrapper>
       
       <C.Wrapper>
            <span style={{marginBottom: 10}}>Câmbio</span>
       <select defaultValue={modelo.cambio}
         style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px"}}
         className="editSelect"
         onChange={handleCambio}
         >
          <option value="MANUAL">MANUAL</option>
          <option value="AUTOMATICO">AUTOMATICO</option>
        </select>
        </C.Wrapper>

        </C.FirstPart>
        <C.SecondPart>

            
        <C.Wrapper>
            <span>Imagem</span>
              <TextField className="inputSize space"
              hiddenLabel
              type="text"
              id="filled-hidden-label-small"
              variant="filled"
              onChange={handleImagem}
              value={imagem}
            />
          </C.Wrapper>

          <C.Wrapper>
            <span>Portas</span>
              <TextField className="inputSize space"
              hiddenLabel
              type="number"
              id="filled-hidden-label-small"
              variant="filled"
              onChange={handlePortas}
              value={portas}
            />
          </C.Wrapper>

          <C.Wrapper>
            <span>Ano</span>
              <TextField className="inputSize space"
              hiddenLabel
              type="number"
              id="filled-hidden-label-small"
              variant="filled"
              onChange={handleAno}
              value={ano}
            />
          </C.Wrapper>

            <C.Wrapper>
              <span>Marca</span>
            <TextField className="inputSize space"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              defaultValue={modelo.marca.nome}
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

export default AdminEditModelo