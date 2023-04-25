insert into modelo (id, descricao) values (1, 'X6');
insert into modelo (id, descricao) values (2, 'IX3 M SPORT');
insert into modelo (id, descricao) values (3, 'M8');

insert into modelo (id, descricao) values (4, 'GLA SUV');
insert into modelo (id, descricao) values (5, 'CLA 250');
insert into modelo (id, descricao) values (6, 'GLS 450');


insert into marca (id, descricao, modelo_id) values (1, 'BMW', 1);
insert into marca (id, descricao, modelo_id) values (2, 'BMW', 2);
insert into marca (id, descricao, modelo_id) values (3, 'BMW', 3);

insert into marca (id, descricao, modelo_id) values (4, 'MERCEDES', 4);
insert into marca (id, descricao, modelo_id) values (5, 'MERCEDES', 5);
insert into marca (id, descricao, modelo_id) values (6, 'MERCEDES', 6);


insert into automovel (id, placa, img, descricao, qtd_portas, chassi, valor_diaria, marca_id) values (1, 'XYZ', "https://www.pngplay.com/wp-content/uploads/2/White-BMW-Download-Free-PNG.png", "Carro legal", 4, 'ABC', '300', 1);
insert into automovel (id, placa, img, descricao, qtd_portas, chassi, valor_diaria, marca_id) values (2, 'WAK', "https://www.pngplay.com/wp-content/uploads/2/White-BMW-Download-Free-PNG.png", "Carro legal", 4, 'ADE', '500', 2);
insert into automovel (id, placa, img, descricao, qtd_portas, chassi, valor_diaria, marca_id) values (3, 'WAK', "https://www.pngplay.com/wp-content/uploads/2/White-BMW-Download-Free-PNG.png", "Carro legal", 4, 'ADE', '500', 3);
insert into automovel (id, placa, img, descricao, qtd_portas, chassi, valor_diaria, marca_id) values (4, 'WAK', "https://www.pngplay.com/wp-content/uploads/2/White-BMW-Download-Free-PNG.png", "Carro legal", 4, 'ADE', '500', 4);
insert into automovel (id, placa, img, descricao, qtd_portas, chassi, valor_diaria, marca_id) values (5, 'WAK', "https://www.pngplay.com/wp-content/uploads/2/White-BMW-Download-Free-PNG.png", "Carro legal", 4, 'ADE', '500', 5);
insert into automovel (id, placa, img, descricao, qtd_portas, chassi, valor_diaria, marca_id) values (6, 'WAK', "https://www.pngplay.com/wp-content/uploads/2/White-BMW-Download-Free-PNG.png", "Carro legal", 4, 'ADE', '500', 6);


insert into usuario (id, cpf, nome, admin, email, senha) values (1, '129', 'Leonardo', true, 'leo@gmail.com', '123');


insert into locacao (id, data_locacao, data_devolucao, valor_locacao, automovel_id, usuario_id) values (1, '2022-02-20', '2022-02-22', 600, 1, 1);
