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
import StandardButton from '../StandardButton';
import SearchBar from '../SearchBar';

const ModalMarcaAdmin = () => {

  const [tableData, setTableData] = React.useState(null);

  const [marcas, setMarcas] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {

    const handleMarcas = async () => {

      const json = await api.getMarcas(count, search);
      setMarcas(json);

    }

    handleMarcas();

  }, [count, search]);

  const handleNext = () => {

    if((count + 1) < marcas.totalPages){

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

  const deleteMarca = (id) => {
    Swal.fire({
      title: 'Tem certeza que quer excluir essa marca?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Excluir',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Você excluiu a marca com sucesso!!',
          showConfirmButton: true,
          timer: 5000
        });

        await api.deleteMarca(id);
        window.location.href = "/admin/marcas"
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
        <Link style={{textDecoration: 'none'}} to="/admin/marcas/cadastrar"><StandardButton text="Cadastrar marca"/></Link>
        <SearchBar text="Pesquisar marca pelo nome" value={search} onChange={handleSearch} onClick={handleSubmitSearch}/>
      </C.AreaSuperior>

    <TableContainer className="center" component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}} align="left">ID</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">MARCA</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="center">DESCRIÇÃO</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="right">EDITAR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {marcas && marcas.content.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}}component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">{row.nome}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="center">{row.descricao}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="right">

              <C.AdjustControllers>
                <Link style={{color: 'black'}} to={`/admin/marcas/${row.id}`}>
                <Tooltip title="Editar">
                  <IconButton style={{transform: 'scale(0.88)', color: 'black'}}>
                    <FaPenSquare />
                  </IconButton>
                </Tooltip>
                </Link>
                <button style={{ border: 'none', outline: 'none', background: 'transparent' }} onClick={() => deleteMarca(row.id)}>
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

export default ModalMarcaAdmin