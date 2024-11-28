INSERT INTO acomodacoes (nome, leitosSolteiro, leitosCasal, climatizacao, garagens, suites)
VALUES 
('Casal Simples', 0, 1, 'Sim', 1, 1),
('Familia Mais', 5, 1, 'Sim', 2, 2),
('Familia Simples', 2, 1, 'Sim', 1, 1),
('Familia Super', 6, 2, 'Sim', 2, 3),
('Solteiro Mais', 0, 1, 'Sim', 1, 1),
('Solteiro Simples', 1, 0, 'Sim', 0, 1);

INSERT INTO cliente (nome, nomeSocial, dataNascimento, dataCadastro)
VALUES ('João Silva', 'João', '1980-05-15', CURDATE());
INSERT INTO cliente (nome, nomeSocial, dataNascimento, dataCadastro, tipo, titularId)
VALUES ('Ana Silva', 'Ana', '2005-08-20', CURDATE(), 'D', 1);

INSERT INTO telefone (clienteId, ddd, numero)
VALUES (1, '11', '98765-4321'),
       (2, '11', '91234-5678');

INSERT INTO endereco (clienteId, rua, bairro, cidade, estado, pais, codigoPostal)
VALUES (1, 'Rua das Flores', 'Centro', 'São Paulo', 'SP', 'Brasil', '01000-000'),
       (2, 'Rua dos Pinheiros', 'Vila Madalena', 'São Paulo', 'SP', 'Brasil', '05400-000');

INSERT INTO documento (clienteId, numero, tipo, dataExpedicao)
VALUES (1, '12.345.678-9', 'RG', '2000-05-15'),
       (2, '98.765.432-1', 'RG', '2005-08-25');

INSERT INTO reservas (clienteId, acomodacaoId)
VALUES (1, 1), 
       (2, 2); 
