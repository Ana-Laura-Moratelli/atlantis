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
var validacaoData_1 = require("../../utils/validacaoData");
var AtualizarDataNascimento = /** @class */ (function (_super) {
    __extends(AtualizarDataNascimento, _super);
    function AtualizarDataNascimento(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        return _this;
    }
    AtualizarDataNascimento.prototype.processar = function () {
        var dataNascimentoAtualizada;
        while (true) {
            var entradaData = this.entrada.receberTexto("Digite a data de nascimento atualizada (formato DD/MM/AAAA): ");
            dataNascimentoAtualizada = (0, validacaoData_1.validarData)(entradaData);
            if (dataNascimentoAtualizada === null) {
                console.log("Data de nascimento inválida. Insira uma data no formato DD/MM/AAAA.");
            }
            else {
                break;
            }
        }
        if (dataNascimentoAtualizada) {
            this.cliente.DataNascimento = dataNascimentoAtualizada;
            console.log("Data de nascimento atualizada com sucesso.");
        }
    };
    return AtualizarDataNascimento;
}(processo_1.default));
exports.default = AtualizarDataNascimento;
