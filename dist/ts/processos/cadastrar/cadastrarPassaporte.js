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
var CadastrarPassaporte = /** @class */ (function (_super) {
    __extends(CadastrarPassaporte, _super);
    function CadastrarPassaporte(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        return _this;
    }
    CadastrarPassaporte.prototype.processar = function () {
        var numero;
        while (true) {
            numero = this.entrada.receberTexto('Número do passaporte (duas letras seguidas de seis dígitos):').toUpperCase();
            var passaporteValido = /^[A-Z]{2}[0-9]{6}$/.test(numero);
            if (!passaporteValido) {
                console.log('Número de passaporte inválido. Deve conter duas letras seguidas de seis dígitos.');
            }
            else {
                break;
            }
        }
        var passaporteExistente = this.clientes.some(function (cliente) {
            return cliente.Documentos.some(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.Passaporte && doc.Numero.toUpperCase() === numero; }) ||
                cliente.Dependentes.some(function (dependente) {
                    return dependente.Documentos.some(function (doc) { return doc.Tipo === TipoDocumento_1.TipoDocumento.Passaporte && doc.Numero.toUpperCase() === numero; });
                });
        });
        if (passaporteExistente) {
            console.log('Passaporte já cadastrado. Não é possível cadastrar um passaporte duplicado.');
        }
        else {
            var dataExpedicao = void 0;
            while (true) {
                var entradaData = this.entrada.receberTexto('Data de expedição (formato DD/MM/AAAA):');
                dataExpedicao = (0, validacaoData_1.validarData)(entradaData);
                if (dataExpedicao === null) {
                    console.log('Data inválida. Insira uma data no formato DD/MM/AAAA.');
                }
                else {
                    break;
                }
            }
            if (dataExpedicao) {
                var passaporte = new documento_1.default(numero, TipoDocumento_1.TipoDocumento.Passaporte, dataExpedicao);
                this.cliente.Documentos.push(passaporte);
                console.log('Passaporte cadastrado com sucesso.');
            }
        }
    };
    return CadastrarPassaporte;
}(processo_1.default));
exports.default = CadastrarPassaporte;
