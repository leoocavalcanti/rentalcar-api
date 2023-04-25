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
import BooleanTag from '../BooleanTag';
import { IconButton, Tooltip } from '@mui/material';
import { Button } from 'react-bootstrap';
import { api } from '../../Helpers/api';
import StandardButton from '../StandardButton';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ModalClientsAdmin = () => {

  const [tableData, setTableData] = React.useState(null);


  const [clients, setClients] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {

    const handleClients = async () => {

      const json = await api.getUsuarios(count, search);
      setClients(json);

    }

    handleClients();

  }, [count, search]);

  const handleNext = () => {

      if((count + 1) < clients.totalPages){

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

  const deleteUser = (id) => {
    Swal.fire({
      title: 'Tem certeza que quer excluir esse usuário?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Excluir',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Você excluiu o usuário com sucesso!',
          showConfirmButton: true,
          timer: 5000
        });

        await api.deleteUser(id);
        window.location.href = "/admin/clientes"
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
        <Link style={{textDecoration: 'none'}} to="/admin/clientes/cadastrar"><StandardButton text="Cadastrar usuário"/></Link>
        <SearchBar text="Pesquisar locação pelo cliente" value={search} onChange={handleSearch} onClick={handleSubmitSearch}/>
      </C.AreaSuperior>
    
    <TableContainer className="center" component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}} align="left">ID</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">NOME</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">EMAIL</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="left">CPF</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="center">ADMINISTRADOR</TableCell>
            <TableCell style={{background: "#1A213F", color: "#FFF", fontWeight: 'bold'}}align="right">EDITAR</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {clients && clients.content.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}}component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="center">{row.nome}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">{row.email}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="left">{row.cpf}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="center">{row.roles.find((r) => r.authority === "ROLE_ADMIN") ? <BooleanTag color="success" size="sm" text="SIM"/> : <BooleanTag color="danger" size="sm" text="NÃO"/>}</TableCell>
              <TableCell style={{background: (index+1) % 2 === 0 ? "#fff" : "#eee"}} align="right"> 

              <C.AdjustControllers>
              <Link style={{color: 'black'}} to={`/admin/clientes/${row.id}`}>
                <Tooltip title="Editar">
                  <IconButton style={{transform: 'scale(0.88)', color: 'black'}}>
                    <FaPenSquare />
                  </IconButton>
                </Tooltip>
              </Link>

                <button style={{ border: 'none', outline: 'none', background: 'transparent' }} onClick={() => deleteUser(row.id)}>
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

export default ModalClientsAdmin