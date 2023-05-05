# Locadora de carros
Aluguel de carros onde usuários cadastrados podem reservar veículos para alugar.

```
• passo 1: git clone no repositório
• passo 2: instalar as dependências na pasta frontend com o comando "yarn install" no git bash
• passo 3: inicialize o front-end com o comando yarn start
• passo 4: para inicializar o backend instale o xampp e o mysql em sua máquina
• passo 5: verifique as dependências do projeto spring e se certifique que você tenha o plugin lombok instalado
```

## Descrição geral do projeto 

* O sistema é uma locadora de vários tipos de veículos, onde usuários cadastrados maiores de 18 anos podem locar veículos.
* O usuário cadastrado pode RESERVAR o aluguel de um carro na locadora que será administrada por um funcionário, o qual tem total controle dos clientes, locações e automóveis por meio da área administrativa.

 
 ### 1. Quem vai usar o programa?
 
 * O cliente e/ou o administrador.
 
 ### 2. Que serviços são “necessários” importantes para os clientes e usuários?
 
 * O cliente tem funções de usuário, alugar algum carro, editar o seu perfil, checar o histórico de veículos onde irá conter todos os dados do veículo locado, incluindo as datas do período de locação e o valor total pago nessa locação.

## Requisitos do projeto

 * **1** - O sistema deve controlar o acesso através de login e senha. Os usuários do sistema serão do tipo administrador e cliente.

 * **2** - O sistema deve permitir apenas a locação para carros previamente cadastrados.

 * **3** - O sistema deve permitir o gerenciamento (Create, Recover, Update e Delete - CRUD) onde clientes só podem editar o seu perfil, e administradores possuem um controle geral do sistema. Clientes (usuários) possuem funções diferentes de administradores. Os administradores devem ter acesso a uma área restrita de administração.

 * **4** - O administrador possui função de adicionar automóvel, remover, editar, excluir usuário, editar usuário, excluir locações, editar locações, criar modelos/editar/excluir e criar marcas/editar/excluir.

 * **5** - O sistema só deverá aceitar as marcas de carros que foram anteriormente cadastradas, o administrador adiciona um novo automóvel após criar ou adicionar uma marca já existente.

 * **6** - O sistema deve permitir que o usuário tenha acesso ao seu histórico de locações no sistema e acompanhar as informações/situação da sua locação.

 * **7** - O sistema deve conter um dashboard administrativo, onde o admin possa visualizar de forma gráfica várias informações (automóveis/locações/usuários/modelos).

 * **8** - O sistema deve possuir um menu (sidebar) onde o usuário (admin/cliente) consiga navegar facilmente entre as telas.

 * **9** - O sistema deverá tratar várias exceções e erros advindos do client (consumidor da api) e exibi-los na tela quando necessário.

   Exemplo: (falha na autenticação, exibir uma mensagem, ato de alugar um veículo e exibir uma mensagem na tela)

* **10** - O sistema deve permitir que o administrador consiga filtrar por meio de um mecanismo de busca, qual cliente/locação/automóvel/modelo seja da sua escolha de procurar no sistema. Tanto vale para o cliente, o usuário tem um mecanismo de busca para pesquisar o nome do modelo do automóvel ele deseja procurar na barra de pesquisa.

* **11** - Cada automóvel do sistema, quando alugado, só pode estar nas mãos do usuário que alugou, ou seja, o automóvel deve ficar indisponível durante o tempo de locação. O automóvel só voltará a estar disponível para ser alugado por outro usuário quando o proprietário do aluguel devolver o veículo.

* **12** - O administrador é responsável por autorizar as locações, assim que uma locação é cadastrada por um usuário, ela ficará pendente até que o admin faça toda as chacagens necessárias para autorizar o aluguel pelo dashboard administrativo.

* **13** - O sistema possui valor de diária dinâmico, assim que o administrador cadastra um novo automóvel no sistema e digita o valor do veículo com base na tabela FIPE, o sistema faz um cálculo interno levando em consideração a categoria do modelo do automóvel e suas informações. Com isso, a diária do automóvel já é automática calculada e definida.

* **14** - O sistema também possui valor de locação dinâmica, é aplicada uma taxa na locação quando um usuário está alugando um veículo próximo a um feriado, e/ou quando o cliente é menor de 23 anos. Também é aplicada uma taxa de seguro do automóvel com base no modelo deste veículo.

 #
 
 ### Diagrama do sistema
 
![DIAGRAMA UML - LOCADORA](https://user-images.githubusercontent.com/98703816/232234898-c47b5ad8-ee85-4446-b0e0-e31351d9090d.png)



### Arquitetura do projeto

![arquitetura](https://user-images.githubusercontent.com/98703816/220233517-2f8d2efd-6aa2-48ab-aafc-208be09ef756.png)

## Imagens do sistema:

![img2](https://user-images.githubusercontent.com/98703816/236519777-9f8aaa53-83d0-45d5-b75c-1681e2ae82f9.png)
![img3](https://user-images.githubusercontent.com/98703816/236519782-4a6169ce-9d59-4a63-8f31-f970a3988802.png)
![img4](https://user-images.githubusercontent.com/98703816/236519783-5d6ab833-d12f-42d7-bdd3-3f27e1153383.png)
![img1](https://user-images.githubusercontent.com/98703816/236519786-bc91b568-0e3c-4b8c-a398-283584a1b432.png)




