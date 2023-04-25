import * as C from './styles'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserStorage';
import { api } from '../../Helpers/api';
import { toast } from 'react-toastify';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Vehicle = () => {

    const {automovelId} = useParams();
    const navigate = useNavigate();

    const [automovel, setAutomovel] = React.useState(null);

    const [dataLocacao, setDataLocacao] = React.useState('');
    const [dataDevolucao, setDataDevolucao] = React.useState('');
    const [usuarioId, setUsuarioId] = React.useState(null);
    const [blockRent, setBlockRent] = React.useState(false);
    const [diarias, setDiarias] = React.useState(1);
    const [taxas, setTaxas] = React.useState(null);
    const [resumo, setResumo] = React.useState(null);
    const [show, setShow] = React.useState(false);

    const backButton = () => {
        navigate(-1);
      }

    const context = React.useContext(UserContext);

    React.useEffect(() => {
        if(context.data){
            setUsuarioId(context.data.id);
        }
    }, [context]);

    React.useEffect(() => {

        if(automovel && automovel.disponivel === false){

            setBlockRent(true);
        }

    }, [automovel])

    React.useEffect(() => {
        const handleAutomovel = async () => {
            const json = await api.getAutomovel(automovelId);
            setAutomovel(json);
        }

        handleAutomovel();
    }, [automovelId]);

    const handleCloseModal = () => setShow(false);

    const handleOpenModal = async (dataLocacao, dataDevolucao) => {
        if(dataLocacao === '' || dataDevolucao === '' || diarias < 0){
            toast.error('Informe as datas corretamente!');
            return;
        }

        const resumoLocacao = await api.resumoLocacao(dataLocacao, dataDevolucao, automovelId, usuarioId);
        setResumo(resumoLocacao);
        const precoInicial = diarias * resumoLocacao.automovel.diaria;
        const taxas = resumoLocacao.valor - precoInicial;
        setTaxas(taxas);
        setShow(true);
    }

    const handleLocacao = async (dataLocacao, dataDevolucao) => {
        try {
            const json = await api.postLocacao(dataLocacao, dataDevolucao, automovelId, usuarioId);
            toast.success(`O veículo ${automovel.modelo.marca.nome} ${automovel.modelo.nome} foi alugado com sucesso`)
            setBlockRent(true);
            setShow(false);
            return json;
        } catch(e) {
            if(e === 'Location error') {
                toast.error('O automóvel selecionado já foi alugado!');
            } else {
                toast.error('Erro ao alugar veículo');
            }
        }
    }

    React.useEffect(() => {
        let dif1 = new Date(dataDevolucao) - new Date(dataLocacao);
        let dif2 = dif1 / (1000 * 60 * 60 * 24);
        setDiarias(dif2);
    }, [dataLocacao, dataDevolucao]);

    if(!context.data) return null;

      return (
        <>
        <C.Container style={{marginTop: '100px'}}>

        <Button className='backButton' onClick={backButton} style={{ height: '50px', width: '140px'}}>
          <C.ButtonAlign> <ArrowBackIosIcon style={{transform: 'scale(0.9)', marginRight: 20}}/> <span>Voltar</span> </C.ButtonAlign>
        </Button>

            {automovel && <div>
                <Card className="animeLeft" style={{ width: '1000px', margin: '30px 0 0 200px'}}>
                <div className="row">
                    <div className="col-md-4">
                        <Card.Img style={{marginTop: '80px', position: 'relative', left: 60, top: -50, transform: 'scale(1.3)'}} src={automovel.modelo.imagem} width={300} height={200}/>
                    </div>
                    <div className="col-md-8">
                    <Card.Body>
                        <C.Text>
                            <h4>{automovel.modelo.marca.nome} {automovel.modelo.nome}</h4>
                            Descrição: {automovel.modelo.descricao} <br/>
                            Ano: {automovel.modelo.ano} <br/>
                            Portas: {automovel.modelo.portas} <br/>
                            Categoria: {automovel.modelo.categoria} <br/>
                            Câmbio: {automovel.modelo.cambio} <br/>
                            Tempo em dias: {diarias > 0 ? diarias : "1"} dia(s) de aluguel<br/>
                            Subtotal: R$ {(diarias * automovel.diaria) > 0 ? (diarias * automovel.diaria).toFixed(2) : automovel.diaria.toFixed(2)} <br/>
                        </C.Text>
                        <Form style={{ marginTop: '30px' }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Data para retirada</Form.Label>
                            <Form.Control
                            value={dataLocacao}
                            type="date"
                            onChange={(e) => setDataLocacao(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data para devolução</Form.Label>
                            <Form.Control
                            value={dataDevolucao}
                            type="date"
                            onChange={(e) => setDataDevolucao(e.target.value)}
                            />
                        </Form.Group>
                        </Form>
                            <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'center' }}>
                                {automovel.status === "DISPONIVEL" && !blockRent && <C.Button><Button className="button" onClick={() => handleOpenModal(dataLocacao, dataDevolucao)} style={{color: 'white'}} variant="success">Alugar</Button></C.Button>} 
                                {automovel.status === "INDISPONIVEL" && <Button disabled onClick={() => handleOpenModal(dataLocacao, dataDevolucao)} style={{color: 'white'}} variant="danger">Indisponível</Button>}
                                {blockRent && <Button disabled onClick={() => handleOpenModal(dataLocacao, dataDevolucao)} style={{color: 'white'}} variant="danger">Indisponível</Button>}
                            </div>
                        </Card.Body>
                    </div>
                    </div>
                </Card>
            </div>
            }
        </C.Container>


        {resumo && (
        <Modal show={show} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
            <Modal.Title>Resumo da locação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Carro: {`${resumo.automovel.modelo.marca.nome} ${resumo.automovel.modelo.nome} ${resumo.automovel.modelo.ano}`} <br/>
                Descrição: { resumo.automovel.modelo.descricao } <br/>
                Categoria: { resumo.automovel.modelo.categoria } <br/>
                Câmbio: { resumo.automovel.modelo.cambio === 'AUTOMATICO' ? 'Automático' : 'Manual' } <br/>
                Quantidade de dias: { diarias } <br/>
                Diária: R$ { resumo.automovel.diaria.toFixed(2) }/dia <br/>
                Valor da locação: R$ { (resumo.automovel.diaria * diarias).toFixed(2) } <br/>
                Valor de taxas inclusas: R$ { taxas.toFixed(2) }<br/>
                Subtotal  <span style={{color: "green"}}> R$ {  resumo.valor.toFixed(2) } </span> 
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" style={{color: '#fff'}} onClick={handleCloseModal}>
                Cancelar
            </Button>
            <Button variant="primary" onClick={() => handleLocacao(dataLocacao, dataDevolucao)}>
                Alugar
            </Button>
            </Modal.Footer>
        </Modal>
        )}
        </>
      )
    }


export default Vehicle