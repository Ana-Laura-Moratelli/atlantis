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
var ListagemDependenteTitular = /** @class */ (function (_super) {
    __extends(ListagemDependenteTitular, _super);
    function ListagemDependenteTitular() {
        var _this = _super.call(this) || this;
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        return _this;
    }
    ListagemDependenteTitular.prototype.processar = function () {
        if (this.clientes.length === 0) {
            console.log("Não há dependentes cadastrados.");
            return;
        }
        console.log('1 - Listar todos os dependentes');
        console.log('2 - Buscar por CPF do dependente');
        var opcao = this.entrada.receberNumero("Escolha uma opção: ");
        switch (opcao) {
            case 1:
                this.listarTodosDependentes();
                break;
            case 2:
                this.listarDependentePorCPF();
                break;
            default:
                console.log("Opção inválida. Operação cancelada.");
                return;
        }
    };
    ListagemDependenteTitular.prototype.listarTodosDependentes = function () {
        var _this = this;
        var dependentesMap = [];
        this.clientes.forEach(function (cliente) {
            if (cliente.Dependentes.length > 0) {
                cliente.Dependentes.forEach(function (dependente) {
                    dependentesMap.push({ dependente: dependente, titular: cliente });
                });
            }
        });
        if (dependentesMap.length === 0) {
            console.log("Não há dependentes cadastrados.");
            return;
        }
        console.log("Listando todos os dependentes:");
        dependentesMap.forEach(function (entry, index) {
            _this.impressor = new impressorCliente_1.default(entry.dependente);
            console.log("".concat(index + 1, " - ").concat(_this.impressor.imprimir()));
        });
        var indiceDependente = this.entrada.receberNumero("Digite o número do dependente para ver o titular (ou 0 para cancelar):");
        if (indiceDependente === 0) {
            console.log("Operação cancelada.");
            return;
        }
        if (indiceDependente < 1 || indiceDependente > dependentesMap.length) {
            console.log("Índice inválido. Tente novamente.");
            return;
        }
        var dependenteSelecionado = dependentesMap[indiceDependente - 1];
        this.impressor = new impressorCliente_1.default(dependenteSelecionado.titular);
        console.log("O titular do dependente ".concat(dependenteSelecionado.dependente.Nome, " \u00E9:"));
        console.log(this.impressor.imprimir());
    };
    ListagemDependenteTitular.prototype.listarDependentePorCPF = function () {
        var cpfDependente = this.entrada.receberTexto("Digite o CPF do dependente: ");
        var clienteTitular = null;
        for (var _i = 0, _a = this.clientes; _i < _a.length; _i++) {
            var cliente = _a[_i];
            for (var _b = 0, _c = cliente.Dependentes; _b < _c.length; _b++) {
                var dependente = _c[_b];
                if (dependente.Documentos.some(function (doc) { return doc.Numero === cpfDependente && doc.Tipo === TipoDocumento_1.TipoDocumento.CPF; })) {
                    clienteTitular = cliente;
                    this.impressor = new impressorCliente_1.default(clienteTitular);
                    console.log("Dependente encontrado: ".concat(dependente.Nome));
                    console.log("Titular relacionado:");
                    console.log(this.impressor.imprimir());
                    return;
                }
            }
        }
        if (!clienteTitular) {
            console.log("Dependente não encontrado.");
        }
    };
    return ListagemDependenteTitular;
}(processo_1.default));
exports.default = ListagemDependenteTitular;
