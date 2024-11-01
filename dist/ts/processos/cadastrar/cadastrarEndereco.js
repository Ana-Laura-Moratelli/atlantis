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
var endereco_1 = __importDefault(require("../../modelos/endereco"));
var CadastrarEndereco = /** @class */ (function (_super) {
    __extends(CadastrarEndereco, _super);
    function CadastrarEndereco(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        return _this;
    }
    CadastrarEndereco.prototype.processar = function () {
        console.log('Endereço');
        var rua = this.entrada.receberTexto('Rua:');
        var bairro = this.entrada.receberTexto('Bairro:');
        var cidade = this.entrada.receberTexto('Cidade:');
        var estado = this.entrada.receberTexto('Estado:');
        var pais = this.entrada.receberTexto('País:');
        var codigoPostal;
        while (true) {
            codigoPostal = this.entrada.receberTexto('Código postal (formato 99999-999):');
            var codigoPostalValido = /^[0-9]{5}-[0-9]{3}$/.test(codigoPostal);
            if (!codigoPostalValido) {
                console.log('Código postal inválido. O código postal deve estar no formato 99999-999.');
            }
            else {
                break;
            }
        }
        var endereco = new endereco_1.default(rua, bairro, cidade, estado, pais, codigoPostal);
        this.cliente.Endereco = endereco;
        console.log('Endereço cadastrado com sucesso.');
    };
    return CadastrarEndereco;
}(processo_1.default));
exports.default = CadastrarEndereco;
