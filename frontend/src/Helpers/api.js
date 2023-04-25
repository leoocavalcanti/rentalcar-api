const BASE = "http://localhost:8080";

const basicHeader = () => 'Basic ' + window.btoa("rentalcar" + ':' + "rentalcar123");

const headers = {
  
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicHeader()

};

const token = window.localStorage.getItem("token") && window.localStorage.getItem("token");
const id = window.localStorage.getItem("id") && window.localStorage.getItem("id");

export const api = {

  checkToken: async (id) => {

    const req = await fetch(`${BASE}/usuarios/${id}`, {

      headers: {

        "Authorization": "Bearer " + token
      }
    });
    const json = await req.json();
    return json;

  },

  doLogin: async (username, password) => {

    
    const req = await fetch(BASE + "/oauth/token", {

      method: "POST",
      headers: headers,
      body: `grant_type=password&username=${username}&password=${password}`

    })

    const json = await req.json();
    return json;

    
  },

  doLogout: () => {

    window.localStorage.removeItem("token");
    window.location.href = "/login";

  },

  getAutomoveis: async (count, search) => {

    const req = await fetch(`${BASE}/automoveis?size=6&page=${count}&modelo=${search}`, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  getMarcas: async (count, search) => {

    const req = await fetch(`${BASE}/marcas?size=6&page=${count}&nome=${search}`, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  getAutomoveisHome: async (count, search) => {

    const req = await fetch(`${BASE}/automoveis?size=3&page=${count}&modelo=${search}`, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  getAllAutomoveis: async () => {

    const req = await fetch(`${BASE}/automoveis`, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  getAllModelos: async () => {

    const req = await fetch(`${BASE}/modelos`, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  getAllMarcas: async () => {

    const req = await fetch(`${BASE}/marcas`, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  getAllUsuarios: async () => {

    const req = await fetch(`${BASE}/usuarios`, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  getModelos: async (count, search) => {

    const req = await fetch(`${BASE}/modelos?size=6&page=${count}&nome=${search}`, {

      headers: {
      
        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  getAutomovel: async (id) => {

    const req = await fetch(BASE + "/automoveis/"+id, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  putAutomovel: async (id, valorAutomovel, status, diaria, placa, modeloId) => {
    const req = await fetch(BASE + "/automoveis/" + id, {
      method: 'PUT',
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({
        valorAutomovel: valorAutomovel,
        status: status,
        diaria: diaria,
        placa: placa,
        modelo: {
            id: modeloId,
        }
      })
    });

    const json = await req.json();
    return json;
  },

  putUsuario: async (id, nome, email, senha, dataNascimento, cep, cpf, registroCnh) => {
    const req = await fetch(BASE + "/usuarios/" + id, {
      method: 'PUT',
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
        dataNascimento: dataNascimento,
        cep: cep,
        cpf: cpf,
        registroCnh: registroCnh
      })
    });

    const json = await req.json();
    return json;
  },

  putModelo: async (id, nome, descricao, categoria, cambio, imagem, portas, ano) => {
    const req = await fetch(BASE + "/modelos/" + id, {
      method: 'PUT',
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({
        nome: nome,
        descricao: descricao,
        categoria: categoria,
        cambio: cambio,
        imagem: imagem,
        portas: portas,
        ano: ano
      })
    });

    const json = await req.json();
    return json;
  },

  putMarca: async (id, nome, descricao) => {
    const req = await fetch(BASE + "/marcas/" + id, {
      method: 'PUT',
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({
        nome: nome,
        descricao: descricao,
      })
    });

    const json = await req.json();
    return json;
  },

  setAdmin: async (id) => {
    const req = await fetch(BASE + "/usuarios/admin/" + id, {
      method: 'PUT',
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token}
    });
    const json = await req.json();
    return json;
  },

  deleteAutomovel: async (id) => {
    await fetch(BASE + "/automoveis/" + id, {
      headers: {

        "Authorization": "Bearer " + token
      },
      
      method: 'DELETE'
    });
  },

  deleteMarca: async (id) => {
    await fetch(BASE + "/marcas/" + id, {
      headers: {

        "Authorization": "Bearer " + token
      },
      
      method: 'DELETE'
    });
  },

  deleteModelo: async (id) => {
    await fetch(BASE + "/modelos/" + id, {
      headers: {

        "Authorization": "Bearer " + token
      },
      
      method: 'DELETE'
    });
  },

  deleteUser: async (id) => {
    await fetch(BASE + "/usuarios/" + id, {
      headers: {

        "Authorization": "Bearer " + token
      },
      
      method: 'DELETE'
    });
  },

  removeLocacao: async (id) => {
    await fetch(BASE + "/locacoes/" + id, {

      headers: {

        "Authorization": "Bearer " + token
      },
      
      method: 'DELETE'
    });
  },

  getLocacoes: async (count, search) => {

    const req = await fetch(`${BASE}/locacoes?size=6&page=${count}&proprietario=${search}`, {

      headers: {

        "Authorization": "Bearer " + token
      }
    });
    const json = await req.json();
    return json;

  },

  getLocacao: async (id) => {

    const req = await fetch(BASE + "/locacoes/"+id, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  getModelo: async (id) => {

    const req = await fetch(BASE + "/modelos/"+id, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  getMarca: async (id) => {

    const req = await fetch(BASE + "/marcas/"+id, {

      headers: {

        "Authorization": "Bearer " + token
      }

    });
    const json = await req.json();
    return json;

  },

  updateUser: async (id, cpf, dataNascimento, registroCnh, cep, nome, email, senha) => {
    const req = await fetch(BASE + `/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
    },
      body: JSON.stringify({
        id: id,
        cpf: cpf,
        dataNascimento: dataNascimento,
        registroCnh: registroCnh,
        cep: cep,
        nome: nome,
        email: email,
        senha: senha
      })
    });

    const json = await req.json();
    return json;
  },

  getUsuario: async (id) => {

    const req = await fetch(`${BASE}/usuarios/${id}`, {

      headers: {

        "Authorization": "Bearer " + token
      }
    });
    const json = await req.json();
    return json;

  },

  getUsuarios: async (count, search) => {

    const req = await fetch(`${BASE}/usuarios?size=6&page=${count}&nome=${search}`, {

      headers: {

        "Authorization": "Bearer " + token
      }
    });
    const json = req.json();
    return json;
  },

  postLocacao: async (dataLocacao, dataDevolucao, automovelId, usuarioId) => {

    const req = await fetch(BASE + "/locacoes", {

      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({

        dataLocacao: dataLocacao,
        dataDevolucao: dataDevolucao,
        ativa: true,
        automovel: {
          id: automovelId
        },
        usuarioId: usuarioId

      })

    });

    const json = await req.json();
    return json;
  },

  postMarca: async (nome, descricao) => {

    const req = await fetch(BASE + "/marcas", {

      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({

        nome: nome,
        descricao: descricao

      })

    });

    const json = await req.json();
    return json;
  },

  postModelo: async (nome, descricao, categoria, cambio, imagem, portas, ano, marcaId) => {

    const req = await fetch(BASE + "/modelos", {

      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({

        nome: nome,
        descricao: descricao,
        categoria: categoria,
        cambio: cambio,
        imagem: imagem,
        portas: portas,
        ano: ano,
        marca: {
          id: marcaId
        }

      })

    });

    const json = await req.json();
    return json;
  },

  postAutomovel: async (valorAutomovel, placa, modeloId) => {

    const req = await fetch(BASE + "/automoveis", {

      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({

        valorAutomovel: valorAutomovel,
        placa: placa,
        modelo: {
          id: modeloId
        },

      })

    });

    const json = await req.json();
    return json;
  },

  putLocacao: async (id, dataLocacao, dataDevolucao, valor, status, automovelId) => {

    const req = await fetch(`${BASE}/locacoes/${id}`, {

      method: "PUT",
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({

        dataLocacao: dataLocacao,
        dataDevolucao: dataDevolucao,
        valor: valor,
        status: status,
        automovel: {
          id: automovelId
        },

      })

    });

    const json = await req.json();
    return json;
  },

  resumoLocacao: async(dataLocacao, dataDevolucao, automovelId, userId) => {

    try {
      const req = await fetch(`${BASE}/locacoes/resumo`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          dataLocacao: dataLocacao,
          dataDevolucao: dataDevolucao,
          automovel: {
            id: automovelId
          },
          usuarioId: userId
        })
      })

      const json = await req.json();
      return json;

    } catch(e) {
      console.log(e);
    }
  },

  putLocacaoStatus: async (id, dataLocacao, dataDevolucao, valor, status, automovelId) => {

    const req = await fetch(`${BASE}/locacoes/status/${id}`, {

      method: "PUT",
      headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
      body: JSON.stringify({

        dataLocacao: dataLocacao,
        dataDevolucao: dataDevolucao,
        valor: valor,
        status: status,
        automovel: {
          id: automovelId
        },

      })

    });

    const json = await req.json();
    return json;
  },

  devolverCarroLocacao: async(id) => {
    try {
      const req = await fetch(BASE + `/locacoes/devolver/${id}`, {
        headers: {

          "Authorization": "Bearer " + token
        },
        method: 'POST',
      });

      await req.json();
    } catch(e) {
      console.log(e);
    }

  },

  registerUser: async (nome, cpf, cep, email, dataNascimento, registroCnh, senha) => {

    try{

      const req = await fetch(BASE + '/usuarios/cadastrar', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          cpf: cpf,
          cep: cep,
          dataNascimento: dataNascimento,
          registroCnh: registroCnh,
          nome: nome,
          email: email,
          senha: senha
        })
      });
  
      const json = await req.json();
      return json;

    }

    catch(e){
      return e.message;
    }
  },
  
  isAdmin: async () => {


      const req = await fetch(`${BASE}/usuarios/${id}`, {
  
        headers: {
  
          "Authorization": "Bearer " + token
        }
      });

      const json = await req.json();

      if(json.nome){

        let cargo = json.roles.find((role) => role.authority === "ROLE_ADMIN");
        
        if(cargo && cargo.authority === "ROLE_ADMIN"){
          
          return true;
        }

        return false;
      }

  }

}
