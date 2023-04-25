insert into marca (id, nome, descricao) values (1, 'Fiat', 'Marca italiana que oferece muito conforto');
insert into marca (id, nome, descricao) values (2, 'Audi', 'A Audi traz elegância e sutileza em seus carros');
insert into marca (id, nome, descricao) values (3, 'Mercedes', 'Marca alemã, uma mistura de luxo, esportividade e desempenho');
insert into marca (id, nome, descricao) values (4, 'Jeep', 'Essa marca oferece aventura, liberdade, autenticidade e paixão');
insert into marca (id, nome, descricao) values (5, 'BMW', 'Marca para quem ama tecnologia, design, luxo e velocidade');
insert into marca (id, nome, descricao) values (6, 'Volkswagen', 'Tecnologia e robustez que somente a Volkswagen oferece');
insert into marca (id, nome, descricao) values (7, 'Nissan', 'O melhor da tecnologia japonesa ao seu alcance');


insert into modelo (id, nome, descricao, portas, ano, img, categoria, cambio, marca_id) values (1, 'C 300 AMG', 'Sedan de luxo da Mercedes', '4', '2022', 'https://production.autoforce.com/uploads/version/profile_image/7047/comprar-300-amg-line_753bf79196.png', 1, 1, 3);
insert into modelo (id, nome, descricao, portas, ano, img, categoria, cambio, marca_id) values (2, 'Fastback', 'Carro com toda a tecnologia da fiat', '4', '2022', 'https://fiat.fancar.com.br/storage/app/uploads/public/636/146/727/6361467275b5a859982832.png', 1, 1, 1);
insert into modelo (id, nome, descricao, portas, ano, img, categoria, cambio, marca_id) values (3, 'Compass', 'SUV intermediária de luxo da Jeep, motor 1.3, série S', '4', '2022', 'https://www.jeep.com.br/content/dam/jeep/products/675/15m/1/2023/page/hero.png', 1, 1, 4);
insert into modelo (id, nome, descricao, portas, ano, img, categoria, cambio, marca_id) values (4, 'Nivus', 'Nivus estreia com uma mistura elementos de SUV e linhas de cupê esportivo', '4', '2022', 'https://cristalvolks.com.br/assets/uploads/nt_veiculos_cores/98165-16109-Cinza-Platinum.png', 1, 1, 6);
insert into modelo (id, nome, descricao, portas, ano, img, categoria, cambio, marca_id) values (5, 'Kicks', 'Veículo japonês SUV de alto desempenho', '4', '2022', 'https://www.nissan-cdn.net/content/dam/Nissan/br/site/veiculos/novo-kicks-my23/ddt/branco-teto-preto-exclusive.png.ximg.l_12_m.smart.png', 1, 1, 7);
insert into modelo (id, nome, descricao, portas, ano, img, categoria, cambio, marca_id) values (6, '320i', 'Alto desempenho e tecnologia da BMW', '4', '2022', 'https://www.bmw.com.br/content/dam/bmw/common/all-models/3-series/sedan/2022/navigation/bmw-3-series-sedan-lci-phev-modelfinder.png', 1, 1, 5);


insert into automovel (id, status, valor_automovel, placa, valor_diaria, modelo_id) values (1, 1, 400000, 'AWS9C89', 603.50, 1);
insert into automovel (id, status, valor_automovel, placa, valor_diaria, modelo_id) values (2, 0, 140000, 'AWS9C88', 268.18, 2);
insert into automovel (id, status, valor_automovel, placa, valor_diaria, modelo_id) values (3, 0, 180000, 'AWS9C87', 301.17, 3);
insert into automovel (id, status, valor_automovel, placa, valor_diaria, modelo_id) values (4, 0, 110000, 'AWS9C86', 255.22, 4);
insert into automovel (id, status, valor_automovel, placa, valor_diaria, modelo_id) values (5, 0, 112000, 'AWS9C85', 260.10, 5);
insert into automovel (id, status, valor_automovel, placa, valor_diaria, modelo_id) values (6, 0, 238000, 'AWS9C84', 360.10, 6);


insert into usuario (id, cpf, nome, data_nascimento, registro_cnh, cep, email, senha) values (1, '121.128.127-08', 'Leonardo Cavalcanti', '2003-02-02', '00000000001', '53401130', 'leo@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
insert into usuario (id, cpf, nome, data_nascimento, registro_cnh, cep, email, senha) values (2, '144.169.123-05', 'Raphael Silvestre', '2003-02-02', '00000000002', '53401130', 'raphael@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
insert into usuario (id, cpf, nome, data_nascimento, registro_cnh, cep, email, senha) values (3, '111.338.129-04', 'Pedro Arruda', '2003-02-02', '00000000003', '53401130', 'pedro@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
insert into usuario (id, cpf, nome, data_nascimento, registro_cnh, cep, email, senha) values (4, '079.469.423-01', 'Guilherme Andrade', '2003-02-02', '00000000004', '53401130', 'gui@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO role (id, authority) VALUES (1, 'ROLE_OPERATOR');
INSERT INTO role (id, authority) VALUES (2, 'ROLE_ADMIN');

INSERT INTO usuario_role (usuario_id, role_id) VALUES (1, 1);
INSERT INTO usuario_role (usuario_id, role_id) VALUES (1, 2);
INSERT INTO usuario_role (usuario_id, role_id) VALUES (2, 1);
INSERT INTO usuario_role (usuario_id, role_id) VALUES (2, 2);
INSERT INTO usuario_role (usuario_id, role_id) VALUES (3, 1);
INSERT INTO usuario_role (usuario_id, role_id) VALUES (3, 2);
INSERT INTO usuario_role (usuario_id, role_id) VALUES (4, 1);
INSERT INTO usuario_role (usuario_id, role_id) VALUES (4, 2);


insert into locacao (id, status, proprietario, data_locacao, data_devolucao, valor_locacao, automovel_id, usuario_id) values (1, 0, 'Leonardo Cavalcanti', '2023-03-28', '2023-05-28', 18000, 1, 1);
