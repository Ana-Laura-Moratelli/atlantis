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
var DeletarTitular = /** @class */ (function (_super) {
    __extends(DeletarTitular, _super);
    function DeletarTitular() {
        var _this = _super.call(this) || this;
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        _this.execucao = true;
        return _this;
    }
    DeletarTitular.prototype.processar = function () {
        if (this.clientes.length === 0) {
            console.log("Não há clientes cadastrados.");
            return;
        }
        console.log('1 - Listar todos os titulares');
        console.log('2 - Buscar por CPF do titular');
        var opcao = this.entrada.receberNumero("Escolha uma opção: ");
        var clienteEncontrado = null;
        switch (opcao) {
            case 1:
                clienteEncontrado = this.selecionarTitularPorIndice();
                break;
            case 2:
                clienteEncontrado = this.selecionarTitularPorCPF();
                break;
            default:
                console.log("Opção inválida. Operação cancelada.");
                return;
        }
        if (!clienteEncontrado) {
            console.log("Titular não encontrado.");
            return;
        }
        var quantidadeDependentes = clienteEncontrado.Dependentes.length;
        var confirmacao = this.entrada.receberTexto("Voc\u00EA deseja mesmo deletar o titular ".concat(clienteEncontrado.Nome, " e seus ").concat(quantidadeDependentes, " dependentes? (s/n):"));
        if (confirmacao.toLowerCase() === "s") {
            this.deletarClienteETodosOsDependentes(clienteEncontrado);
            console.log("Titular ".concat(clienteEncontrado.Nome, " e seus dependentes foram exclu\u00EDdos com sucesso!"));
        }
        else {
            console.log("Operação cancelada.");
        }
    };
    DeletarTitular.prototype.selecionarTitularPorIndice = function () {
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
    DeletarTitular.prototype.selecionarTitularPorCPF = function () {
        var cpfTitular = this.entrada.receberTexto("Digite o CPF do titular: ");
        var cliente = this.clientes.find(function (cliente) {
            return cliente.Documentos.some(function (doc) { return doc.Numero === cpfTitular && doc.Tipo === TipoDocumento_1.TipoDocumento.CPF; });
        });
        return cliente || null;
    };
    DeletarTitular.prototype.listarTitulares = function () {
        console.log("Lista de Titulares:");
        this.clientes.forEach(function (cliente, index) {
            console.log("".concat(index + 1, " - ").concat(cliente.Nome));
        });
    };
    DeletarTitular.prototype.deletarClienteETodosOsDependentes = function (cliente) {
        var _this = this;
        cliente.Dependentes.forEach(function (dependente) {
            var indexDependente = _this.clientes.indexOf(dependente);
            if (indexDependente > -1) {
                _this.clientes.splice(indexDependente, 1);
            }
        });
        var index = this.clientes.indexOf(cliente);
        if (index > -1) {
            this.clientes.splice(index, 1);
        }
    };
    return DeletarTitular;
}(processo_1.default));
exports.default = DeletarTitular;
