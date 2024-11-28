create database atlantis;
use atlantis;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    nomeSocial VARCHAR(255),
    dataNascimento DATE,
    dataCadastro DATE,
    tipo CHAR(1) NOT NULL DEFAULT 'T',
    titularId INT NULL,
    FOREIGN KEY (titularId) REFERENCES cliente(id) ON DELETE CASCADE
);

CREATE TABLE telefone (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clienteId INT,
    ddd VARCHAR(2),
    numero VARCHAR(10),
    FOREIGN KEY (clienteId) REFERENCES cliente(id) ON DELETE CASCADE
);

CREATE TABLE endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clienteId INT,
    rua VARCHAR(255),
    bairro VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    pais VARCHAR(50),
    codigoPostal VARCHAR(10),
    FOREIGN KEY (clienteId) REFERENCES cliente(id) ON DELETE CASCADE
);

CREATE TABLE documento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clienteId INT,
    numero VARCHAR(20),
    tipo VARCHAR(50),
    dataExpedicao DATE,
    FOREIGN KEY (clienteId) REFERENCES cliente(id) ON DELETE CASCADE
);

CREATE TABLE acomodacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    leitosSolteiro INT NOT NULL,
    leitosCasal INT NOT NULL,
    climatizacao ENUM('Sim', 'Não') NOT NULL,
    garagens INT NOT NULL,
    suites INT NOT NULL
);

CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clienteId INT NOT NULL,
    acomodacaoId INT NOT NULL,
    dataReserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clienteId) REFERENCES cliente(id),
    FOREIGN KEY (acomodacaoId) REFERENCES acomodacoes(id)
);
