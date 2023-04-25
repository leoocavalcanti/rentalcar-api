import React from 'react'
import * as C from "./styles"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaPenSquare, FaTrash } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { api } from '../../Helpers/api';
import { IconButton, Tooltip } from '@mui/material';
import BooleanTag from '../BooleanTag';
import StandardButton from '../StandardButton';
import SearchBar from '../SearchBar';

const ModalLocationAdmin = () => {

  

  const dataFormat = (dataLocacao) => {

    const data = new Date(dataLocacao);
    const day = data.getDate() + 1;
    const month = data.getMonth() + 1;
    const year = data.getFullYear()
    return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`
 }

  const [tableData, setTableData] = React.useState(null);

  const ref = React.useRef();

  const [locacoes, setLocacoes] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {

    const handleLocacoes = async () => {

      const json = await api.getLocacoes(count, search);
      setLocacoes(json);

    }

    handleLocacoes();

  }, [count, search]);

  const handleNext = () => {

    if((count + 1) < locacoes.totalPages){

        setCount(count + 1);
        console.log(count)
    }


  }

  const handleStatus = async (e, id) => {

    let statusAtual = e.currentTarget.value;
    setStatus(statusAtual)

    const locacao = await api.getLocacao(id);
    if(statusAtual !== ""){

      api.putLocacaoStatus(id, locacao.dataLocacao, locacao.dataDevolucao, locacao.valor, statusAtual, locacao.automovel.id);
      window.location.href = "/admin/locacoes"
      
    }
    

  }

  const handlePrevious = () => {


      if(count >= 1){

        setCount(count - 1);

  }
    
  }

  const handleSearch = (e) => {

    setSearch(e.target.value);
  }

  const handleSubmitSearch = async (e) => {

    e.preventDefault();

  }

  const deleteLocation = (id) => {
    Swal.fire({
      title: 'Tem certeza que quer excluir essa locação?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Excluir',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Você excluiu a locação com sucesso!',
          showConfirmButton: true,
          timer: 5000
        });

        await api.removeLocacao(id);
        window.location.href = "/admin/locacoes"
        setTableData({...tableData, content: tableData.content.filter(row => row.id !== id)});
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  }

  return (
    <C.Container className="animeLeft">

      <C.Adjust>

      <C.AreaSuperior>
        <Link style={{textDecoration: 'none'}} to="/admin/locacoes/cadastrar"><StandardButton text="Cadastrar locação"/></Link>
        <SearchBar text="Pesquisar locação pelo cliente" value={search} onChange={handleSearch} onClick={handleSubmitSearch}/>
      </C.AreaSuperior>

    <TableContainer className="center" component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}} align="left">ID</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">NOME DO CLIENTE</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">DATA DA LOCAÇÃO</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">DATA DA DEVOLUÇÃO</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">VALOR PAGO</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">STATUS</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="right">EDITAR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locacoes && locacoes.content.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}}component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">{row.proprietario}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">{dataFormat(row.dataLocacao)}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">{dataFormat(row.dataDevolucao)}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">R$ {row.valor.toFixed(2)}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">

              <C.StatusArea>
                <div>
                {row.status === "ATIVO" && <BooleanTag color="success" size="sm" text="ATIVO"/>}
                {row.status === "DEVOLVIDO" && <BooleanTag color="info" size="sm" text="DEVOLVIDO"/>}
                {row.status === "PENDENTE" && <BooleanTag color="warning" size="sm" text="PENDENTE"/>}
                {row.status === "REJEITADO" && <BooleanTag color="danger" size="sm" text="REJEITADO"/>}
                </div>

                <select defaultValue={row.status} ref={ref}
                
                className="editSelect"
                onChange={(e) => handleStatus(e, row.id)}
                >
                  <option value="ATIVO">ATIVO</option>
                  <option value="DEVOLVIDO">DEVOLVIDO</option>
                  <option value="PENDENTE">PENDENTE</option>
                  <option value="REJEITADO">REJEITADO</option>
                </select>
              </C.StatusArea>
        
              </TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="right">

              <C.AdjustControllers>
                <Link style={{color: 'black'}} to={`/admin/locacoes/${row.id}`}>
                <Tooltip title="Editar">
                  <IconButton style={{transform: 'scale(0.88)', color: 'black'}}>
                    <FaPenSquare />
                  </IconButton>
                </Tooltip>
                </Link>
                <button style={{ border: 'none', outline: 'none', background: 'transparent' }} onClick={() => deleteLocation(row.id)}>
                <Tooltip title="Deletar">
                  <IconButton style={{transform: 'scale(0.88)', color: 'black'}}>
                    <FaTrash />
                  </IconButton>
                </Tooltip>
                </button>
                </C.AdjustControllers>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <C.ButtonGroup>
      <Button onClick={handlePrevious} className="buttonColor" variant="outline-primary">Anterior</Button>{' '}
      <Button onClick={handleNext} className="buttonColor" variant="outline-primary">Próximo</Button>{' '}
    </C.ButtonGroup>

    </C.Adjust>

    </C.Container>
  )
}

export default ModalLocationAdmin