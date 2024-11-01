"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prompt_sync_1 = __importDefault(require("prompt-sync"));
var Entrada = /** @class */ (function () {
    function Entrada() {
    }
    Entrada.prototype.receberNumero = function (mensagem) {
        var prompt = (0, prompt_sync_1.default)();
        var valor = prompt("".concat(mensagem, " "));
        var numero = new Number(valor);
        return numero.valueOf();
    };
    Entrada.prototype.receberTexto = function (mensagem) {
        var prompt = (0, prompt_sync_1.default)();
        var texto = prompt("".concat(mensagem, " "));
        return texto;
    };
    Entrada.prototype.receberData = function (mensagem) {
        var prompt = (0, prompt_sync_1.default)();
        var texto = prompt("".concat(mensagem, ", no padr\u00E3o dd/MM/yyyy: "));
        var partes = texto.split('/');
        var ano = new Number(partes[2]);
        var mes = new Number(partes[1]);
        var dia = new Number(partes[0]);
        var data = new Date(ano.valueOf(), mes.valueOf() - 1, dia.valueOf());
        return data;
    };
    return Entrada;
}());
exports.default = Entrada;
