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
var documento_1 = __importDefault(require("../../modelos/documento"));
var validacaoData_1 = require("../../utils/validacaoData");
var CadastrarCpf = /** @class */ (function (_super) {
    __extends(CadastrarCpf, _super);
    function CadastrarCpf(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        return _this;
    }
    CadastrarCpf.prototype.processar = function () {
        var numero;
        while (true) {
            numero = this.entrada.receberTexto('Número do documento (somente números, 11 dígitos):');
            var cpfValido = /^[0-9]{11}$/.test(numero);
            if (!cpfValido) {
                console.log('CPF inválido. O CPF deve conter exatamente 11 dígitos numéricos.');
            }
            else {
                break;
            }
        }
        var cpfExistente = this.clientes.some(function (cliente) {
            return cliente.Documentos.some(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.CPF && doc.Numero === numero; }) ||
                cliente.Dependentes.some(function (dependente) {
                    return dependente.Documentos.some(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.CPF && doc.Numero === numero; });
                });
        });
        if (cpfExistente) {
            console.log('CPF já cadastrado. Não é possível cadastrar um CPF duplicado.');
        }
        else {
            var dataExpedicao = void 0;
            while (true) {
                var entradaData = this.entrada.receberTexto('Data de expedição (formato: DD/MM/AAAA):');
                dataExpedicao = (0, validacaoData_1.validarData)(entradaData);
                if (dataExpedicao === null) {
                    console.log('Data inválida. Insira uma data no formato DD/MM/AAAA.');
                }
                else {
                    break;
                }
            }
            if (dataExpedicao) {
                var cpf = new documento_1.default(numero, TipoDocumento_1.TipoDocumento.CPF, dataExpedicao);
                this.cliente.Documentos.push(cpf);
                console.log('CPF cadastrado com sucesso.');
            }
        }
    };
    return CadastrarCpf;
}(processo_1.default));
exports.default = CadastrarCpf;
