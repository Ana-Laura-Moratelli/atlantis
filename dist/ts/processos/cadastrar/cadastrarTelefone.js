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
var telefone_1 = __importDefault(require("../../modelos/telefone"));
var CadastrarTelefone = /** @class */ (function (_super) {
    __extends(CadastrarTelefone, _super);
    function CadastrarTelefone(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        return _this;
    }
    CadastrarTelefone.prototype.processar = function () {
        console.log('Cadastro de Telefone');
        var ddd;
        while (true) {
            ddd = this.entrada.receberTexto('DDD (somente 2 dígitos):');
            var dddValido = /^[0-9]{2}$/.test(ddd);
            if (!dddValido) {
                console.log('DDD inválido. Insira exatamente 2 dígitos.');
            }
            else {
                break;
            }
        }
        var numero;
        while (true) {
            numero = this.entrada.receberTexto('Número do telefone (formato 9999-9999 ou 99999-9999):');
            var numeroValido = /^[0-9]{4,5}-[0-9]{4}$/.test(numero);
            if (!numeroValido) {
                console.log('Número de telefone inválido. Use o formato 9999-9999 ou 99999-9999.');
            }
            else {
                break;
            }
        }
        var telefone = new telefone_1.default(ddd, numero);
        this.cliente.Telefones.push(telefone);
        console.log('Telefone cadastrado com sucesso!');
    };
    return CadastrarTelefone;
}(processo_1.default));
exports.default = CadastrarTelefone;
