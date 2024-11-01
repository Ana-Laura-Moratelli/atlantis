"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cliente = /** @class */ (function () {
    function Cliente(nome, nomeSocial, dataNascimento) {
        this.telefones = [];
        this.documentos = [];
        this.dependentes = [];
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = new Date();
    }
    Object.defineProperty(Cliente.prototype, "Nome", {
        get: function () { return this.nome; },
        set: function (nome) { this.nome = nome; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "NomeSocial", {
        get: function () { return this.nomeSocial; },
        set: function (nomeSocial) { this.nomeSocial = nomeSocial; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "DataNascimento", {
        get: function () { return this.dataNascimento; },
        set: function (dataNascimento) { this.dataNascimento = dataNascimento; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "DataCadastro", {
        get: function () { return this.dataCadastro; },
        set: function (dataCadastro) { this.dataCadastro = dataCadastro; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "Telefones", {
        get: function () { return this.telefones; },
        set: function (telefones) { this.telefones = telefones; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "Endereco", {
        get: function () { return this.endereco; },
        set: function (endereco) { this.endereco = endereco; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "Documentos", {
        get: function () { return this.documentos; },
        set: function (documentos) { this.documentos = documentos; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "Dependentes", {
        get: function () { return this.dependentes; },
        set: function (dependentes) { this.dependentes = dependentes; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "Titular", {
        get: function () { return this.titular; },
        set: function (titular) { this.titular = titular; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "Acomodacao", {
        get: function () { return this.acomodacao; },
        set: function (acomodacao) { this.acomodacao = acomodacao; },
        enumerable: false,
        configurable: true
    });
    return Cliente;
}());
exports.default = Cliente;
