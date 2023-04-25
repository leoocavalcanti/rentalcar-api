import React from 'react'
import * as C from "./styles"
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { FaPenSquare, FaTrash } from 'react-icons/fa';
import BooleanTag from '../BooleanTag';
import { IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { api } from '../../Helpers/api';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StandardButton from '../StandardButton';
import SearchBar from '../SearchBar';

const ModalCarAdmin = () => {

  const [tableData, setTableData] = React.useState(null);

  const ref = React.useRef();

  const [automoveis, setAutomoveis] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [count, setCount] = React.useState(0);


  React.useEffect(() => {

    const handleAutomoveis = async () => {

      const json = await api.getAutomoveis(count, search);
      setAutomoveis(json);

    }

    handleAutomoveis();

  }, [count, search]);

  const handleStatus = async (e, id) => {

    let statusAtual = e.currentTarget.value;
    setStatus(statusAtual)

    const automovel = await api.getAutomovel(id);
    if(statusAtual !== ""){

      api.putAutomovel(id, automovel.valorAutomovel, statusAtual, automovel.diaria, automovel.placa, automovel.modelo.id);
      window.location.href = "/admin/automoveis"
      
    }
  }

  const deleteVehicle = (id) => {
    Swal.fire({
      title: 'Tem certeza que quer excluir esse veículo?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Excluir',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {

      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Você excluiu o veículo com sucesso!',
          showConfirmButton: true,
          timer: 5000
        });

        await api.deleteAutomovel(id);
        window.location.href = "/admin/automoveis"
        setTableData({...tableData, content: tableData.content.filter(row => row.id !== id)});
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  }

  const handleNext = () => {

    if((count + 1) < automoveis.totalPages){

        setCount(count + 1);
        console.log(count)
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


  return (
    <C.Container className="animeLeft">

      <C.Adjust>

      <C.AreaSuperior>
        <Link style={{textDecoration: 'none'}} to="/admin/automoveis/cadastrar"><StandardButton text="Cadastrar automóvel"/></Link>
        <SearchBar text="Pesquisar automóvel pelo modelo" value={search} onChange={handleSearch} onClick={handleSubmitSearch}/>
      </C.AreaSuperior>

    <TableContainer className="center" component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}} align="left">ID</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">NOME</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">DIÁRIA</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">PLACA</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="center">DISPONÍVEL</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="right">EDITAR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {automoveis && automoveis.content && automoveis.content.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}}component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">{`${row.modelo.marca.nome} ${row.modelo.nome}`}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">R$ {row.diaria.toFixed(2)}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">{row.placa}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="right">

              <C.StatusArea>
                <div>
                {row.status === "DISPONIVEL" && <BooleanTag color="success" size="sm" text="SIM"/>}
                {row.status === "INDISPONIVEL" && <BooleanTag color="danger" size="sm" text="NÃO"/>}
                </div>

                <select defaultValue={row.status} ref={ref}
                
                className="editSelect"
                onChange={(e) => handleStatus(e, row.id)}
                >
                  <option value="DISPONIVEL">SIM</option>
                  <option value="INDISPONIVEL">NÃO</option>
                </select>
              </C.StatusArea>

              </TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="right">


              <C.AdjustControllers>
              <Link style={{color: 'black'}} to={`/admin/automoveis/${row.id}`}>
                <Tooltip title="Editar">
                  <IconButton style={{transform: 'scale(0.88)', color: 'black'}}>
                    <FaPenSquare />
                  </IconButton>
                </Tooltip>
              </Link>

              <button style={{ border: 'none', outline: 'none', background: 'transparent' }} onClick={() => deleteVehicle(row.id)}>
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

export default ModalCarAdmin