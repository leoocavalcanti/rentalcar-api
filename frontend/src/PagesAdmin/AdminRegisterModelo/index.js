import * as C from "./styles";
import React from 'react'
import AdminSideBar from "../../Components/AdminSideBar";
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Helpers/api';
import { Button } from 'react-bootstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Swal from 'sweetalert2';


const AdminRegisterModelo = () => {

  const navigate = useNavigate();

  const [marca, setMarca] = React.useState(null);
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [cambio, setCambio] = React.useState(1);
  const [categoria, setCategoria] = React.useState(1);
  const [imagem, setImagem] = React.useState("");
  const [portas, setPortas] = React.useState("");
  const [ano, setAno] = React.useState("");
  const [marcaId, setMarcaId] = React.useState(1);

  React.useEffect(() => {

    const handleMarca = async () => {

      const json = await api.getAllMarcas();
      setMarca(json);

    }

    handleMarca();

  }, []);

  const backButton = () => {
    navigate(-1);
  }

  const salvar = () => {

    
    Swal.fire({
      title: 'Tem certeza que deseja cadastrar esse modelo?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Cadastrar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {


      if (result.isConfirmed) {
        await api.postModelo(nome, descricao, categoria, cambio, imagem, portas, ano, marcaId).then((res) => {
          if (res.error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Erro ao cadastrar o modelo',
              showCloseButton: true,
              timer: 5000
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Você cadastrou o modelo com sucesso!',
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

  const handleMarca = (e) => {
    
    let marcaId = e.currentTarget.value
    setMarcaId(marcaId)
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
            <span>Nome</span>
            <TextField className="inputSize space"
              placeholder="Nome do modelo"
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
              placeholder="Descrição do modelo"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              type='text'
              onChange={handleDescricao}
              value={descricao}
            />
            </C.Wrapper>

        <C.Wrapper>
        <span style={{marginBottom: 10}}>Câmbio</span>
       <select
         style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px", marginBottom: '10px'}}
         className="editSelect space"
         onChange={handleCambio}
         >
            <option value="MANUAL">MANUAL</option>
            <option value="AUTOMATICO">AUTOMATICO</option>
        </select>
        </C.Wrapper>

        
        <C.Wrapper>
        <span style={{marginBottom: 10}}>Categoria</span>
       <select
         style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px", marginBottom: '10px'}}
         className="editSelect space"
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

            </C.FirstPart>
            <C.SecondPart>

            <C.Wrapper>
            <span>Imagem</span>
            <TextField className="inputSize space"
              placeholder="URL - Exemplo: https://s2.glbimg.com/1C2g.jpg"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              type='text'
              onChange={handleImagem}
              value={imagem}
            />
            </C.Wrapper>

            <C.Wrapper>
            <span>Portas</span>
            <TextField className="inputSize space"
              placeholder="Quantidade de portas"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              type='number'
              onChange={handlePortas}
              value={portas}
            />
            </C.Wrapper>

            <C.Wrapper>
            <span>Ano</span>
            <TextField className="inputSize space"
              placeholder="Ano do modelo"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              type='text'
              onChange={handleAno}
              value={ano}
            />
            </C.Wrapper>

            <C.Wrapper>
        <span style={{marginBottom: 10}}>Marca</span>
       <select
         style={{transform: 'scale(0.90)', borderColor: "#E8E8E8", backgroundColor: "#E8E8E8", borderRadius: "3px", marginBottom: '10px'}}
         className="editSelect space"
         onChange={handleMarca}
         >
          {marca.content.map((m) => (

          <>
            <option value={m.id}>{m.nome}</option>
          </>

          ))}
        </select>
        </C.Wrapper>

            </C.SecondPart>
            

           
            </C.Area>

          </C.CardArea>

          <Button className="button" onClick={salvar} variant="primary">Cadastrar modelo</Button>{' '}
          
        </C.EditArea>
    </C.Container>
  )
}

export default AdminRegisterModelo