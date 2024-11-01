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
var TipoDocumento_1 = require("../../enumeracoes/TipoDocumento");
var DeletarDependente = /** @class */ (function (_super) {
    __extends(DeletarDependente, _super);
    function DeletarDependente() {
        var _this = _super.call(this) || this;
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        _this.execucao = true;
        return _this;
    }
    DeletarDependente.prototype.processar = function () {
        if (this.clientes.length === 0) {
            console.log("Não há clientes cadastrados.");
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
        this.listarDependentes(clienteTitular);
        if (clienteTitular.Dependentes.length === 0) {
            console.log("O titular selecionado não possui dependentes cadastrados.");
            return;
        }
        var indiceDependente = this.entrada.receberNumero("Digite o número do dependente a ser excluído (ou 0 para cancelar):");
        if (indiceDependente === 0) {
            console.log("Operação cancelada.");
            return;
        }
        if (indiceDependente < 1 || indiceDependente > clienteTitular.Dependentes.length) {
            console.log("Índice de dependente inválido. Tente novamente.");
            return;
        }
        var dependenteEncontrado = clienteTitular.Dependentes[indiceDependente - 1];
        var confirmacao = this.entrada.receberTexto("Voc\u00EA deseja mesmo deletar o dependente ".concat(dependenteEncontrado.Nome, "? (S/N):"));
        if (confirmacao.toLowerCase() === "s") {
            this.deletarDependente(clienteTitular, dependenteEncontrado);
            console.log("Dependente ".concat(dependenteEncontrado.Nome, " exclu\u00EDdo com sucesso!"));
        }
        else {
            console.log("Operação cancelada.");
        }
    };
    DeletarDependente.prototype.selecionarTitularPorIndice = function () {
        this.listarTitulares();
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
    DeletarDependente.prototype.selecionarTitularPorCPF = function () {
        var cpfTitular = this.entrada.receberTexto("Digite o CPF do titular: ");
        var cliente = this.clientes.find(function (cliente) {
            return cliente.Documentos.some(function (doc) { return doc.Numero === cpfTitular && doc.Tipo === TipoDocumento_1.TipoDocumento.CPF; });
        });
        return cliente || null;
    };
    DeletarDependente.prototype.listarTitulares = function () {
        console.log("Lista de Titulares:");
        this.clientes.forEach(function (cliente, index) {
            console.log("".concat(index + 1, " - ").concat(cliente.Nome));
        });
    };
    DeletarDependente.prototype.listarDependentes = function (titular) {
        console.log("Lista de Dependentes de ".concat(titular.Nome, ":"));
        titular.Dependentes.forEach(function (dependente, index) {
            console.log("".concat(index + 1, " - ").concat(dependente.Nome));
        });
    };
    DeletarDependente.prototype.deletarDependente = function (titular, dependente) {
        var indexDependente = titular.Dependentes.indexOf(dependente);
        if (indexDependente > -1) {
            titular.Dependentes.splice(indexDependente, 1);
        }
        var indexGlobal = this.clientes.indexOf(dependente);
        if (indexGlobal > -1) {
            this.clientes.splice(indexGlobal, 1);
        }
    };
    return DeletarDependente;
}(processo_1.default));
exports.default = DeletarDependente;
