"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var processo_1 = __importDefault(require("../../abstracoes/processo"));
var armazem_1 = __importDefault(require("../../dominio/armazem"));
var impressorCliente_1 = __importDefault(require("../../impressores/impressorCliente"));
var TipoDocumento_1 = require("../../enumeracoes/TipoDocumento");
var ListagemTitularDependente = /** @class */ (function (_super) {
    __extends(ListagemTitularDependente, _super);
    function ListagemTitularDependente() {
        var _this = _super.call(this) || this;
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        return _this;
    }
    ListagemTitularDependente.prototype.processar = function () {
        var _this = this;
        if (this.clientes.length === 0) {
            console.log("Não há titulares cadastrados.");
            return;
        }
        console.log('1 - Listar todos os titulares');
        console.log('2 - Buscar por CPF do titular');
        var opcao = this.entrada.receberNumero("Escolha uma opção: ");
        var clienteTitular = null;
        switch (opcao) {
            case 1:
                clienteTitular = this.selecionarTitularPorIndice();
                break;
            case 2:
                clienteTitular = this.selecionarTitularPorCPF();
                break;
            default:
                console.log("Opção inválida. Operação cancelada.");
                return;
        }
        if (!clienteTitular) {
            console.log("Titular não encontrado.");
            return;
        }
        if (clienteTitular.Dependentes.length === 0) {
            console.log("O titular ".concat(clienteTitular.Nome, " n\u00E3o possui dependentes."));
            return;
        }
        console.log("Dependentes do titular ".concat(clienteTitular.Nome, ":"));
        clienteTitular.Dependentes.forEach(function (dependente) {
            _this.impressor = new impressorCliente_1.default(dependente);
            console.log(_this.impressor.imprimir());
        });
    };
    ListagemTitularDependente.prototype.selecionarTitularPorIndice = function () {
        console.log("Lista de Titulares:");
        this.clientes.forEach(function (cliente, index) {
            console.log("".concat(index + 1, " - ").concat(cliente.Nome));
        });
        var indiceTitular = this.entrada.receberNumero("Digite o número do titular (ou 0 para cancelar):");
        if (indiceTitular === 0) {
            console.log("Operação cancelada.");
            return null;
        }
        if (indiceTitular < 1 || indiceTitular > this.clientes.length) {
            console.log("Índice de titular inválido. Tente novamente.");
            return null;
        }
        return this.clientes[indiceTitular - 1];
    };
    ListagemTitularDependente.prototype.selecionarTitularPorCPF = function () {
        var cpfTitular = this.entrada.receberTexto("Digite o CPF do titular: ");
        var clienteTitular = this.clientes.find(function (cliente) {
            return cliente.Documentos.some(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.CPF && doc.Numero === cpfTitular; });
        });
        return clienteTitular || null;
    };
    return ListagemTitularDependente;
}(processo_1.default));
exports.default = ListagemTitularDependente;
