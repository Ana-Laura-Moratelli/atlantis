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
var AtualizarRg = /** @class */ (function (_super) {
    __extends(AtualizarRg, _super);
    function AtualizarRg(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        return _this;
    }
    AtualizarRg.prototype.processar = function () {
        var rgDocumento = this.cliente.Documentos.find(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.RG; });
        if (!rgDocumento) {
            console.log("RG não encontrado para este cliente.");
            return;
        }
        var novoNumero;
        while (true) {
            novoNumero = this.entrada.receberTexto("Novo número do RG (somente números, 9 dígitos):");
            var rgValido = /^[0-9]{9}$/.test(novoNumero);
            if (!rgValido) {
                console.log("RG inválido. O RG deve conter exatamente 9 dígitos numéricos.");
            }
            else {
                var rgExistente = this.clientes.some(function (cliente) {
                    return cliente.Documentos.some(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.RG && doc.Numero === novoNumero && doc !== rgDocumento; }) ||
                        cliente.Dependentes.some(function (dependente) {
                            return dependente.Documentos.some(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.RG && doc.Numero === novoNumero && doc !== rgDocumento; });
                        });
                });
                if (rgExistente) {
                    console.log("RG já cadastrado. Não é possível atualizar para um número duplicado.");
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
        rgDocumento.Numero = novoNumero;
        rgDocumento.DataExpedicao = novaDataExpedicao;
        console.log("RG atualizado com sucesso.");
    };
    return AtualizarRg;
}(processo_1.default));
exports.default = AtualizarRg;
