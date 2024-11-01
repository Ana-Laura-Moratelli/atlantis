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
var TipoDocumento_1 = require("../../enumeracoes/TipoDocumento");
var armazem_1 = __importDefault(require("../../dominio/armazem"));
var validacaoData_1 = require("../../utils/validacaoData");
var AtualizarCpf = /** @class */ (function (_super) {
    __extends(AtualizarCpf, _super);
    function AtualizarCpf(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        return _this;
    }
    AtualizarCpf.prototype.processar = function () {
        var cpfDocumento = this.cliente.Documentos.find(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.CPF; });
        if (!cpfDocumento) {
            console.log("CPF não encontrado para este cliente.");
            return;
        }
        var novoNumero;
        while (true) {
            novoNumero = this.entrada.receberTexto("Novo número do CPF (somente números, 11 dígitos):");
            var cpfValido = /^[0-9]{11}$/.test(novoNumero);
            if (!cpfValido) {
                console.log("CPF inválido. O CPF deve conter exatamente 11 dígitos numéricos.");
            }
            else {
                var cpfExistente = this.clientes.some(function (cliente) {
                    return cliente.Documentos.some(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.CPF && doc.Numero === novoNumero && doc !== cpfDocumento; }) ||
                        cliente.Dependentes.some(function (dependente) {
                            return dependente.Documentos.some(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.CPF && doc.Numero === novoNumero && doc !== cpfDocumento; });
                        });
                });
                if (cpfExistente) {
                    console.log("CPF já cadastrado. Não é possível atualizar para um número duplicado.");
                }
                else {
                    break;
                }
            }
        }
        var novaDataExpedicao;
        while (true) {
            var entradaData = this.entrada.receberTexto("Nova data de expedição (formato DD/MM/AAAA):");
            novaDataExpedicao = (0, validacaoData_1.validarData)(entradaData);
            if (novaDataExpedicao === null) {
                console.log("Data inválida. Insira uma data no formato DD/MM/AAAA.");
            }
            else {
                break;
            }
        }
        cpfDocumento.Numero = novoNumero;
        cpfDocumento.DataExpedicao = novaDataExpedicao;
        console.log("CPF atualizado com sucesso.");
    };
    return AtualizarCpf;
}(processo_1.default));
exports.default = AtualizarCpf;
