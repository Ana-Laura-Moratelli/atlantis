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
var AtualizarTelefone = /** @class */ (function (_super) {
    __extends(AtualizarTelefone, _super);
    function AtualizarTelefone(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        return _this;
    }
    AtualizarTelefone.prototype.processar = function () {
        if (this.cliente.Telefones.length === 0) {
            console.log("Não há telefones cadastrados.");
            return;
        }
        console.log("Telefones cadastrados:");
        this.cliente.Telefones.forEach(function (telefone, index) {
            console.log("".concat(index + 1, " - (").concat(telefone.Ddd, ") ").concat(telefone.Numero));
        });
        var indice = this.entrada.receberNumero("Digite o número do índice do telefone que deseja editar: ") - 1;
        if (indice >= 0 && indice < this.cliente.Telefones.length) {
            var novoDdd = void 0;
            while (true) {
                novoDdd = this.entrada.receberTexto("Digite o novo DDD (somente 2 dígitos): ");
                var dddValido = /^[0-9]{2}$/.test(novoDdd);
                if (!dddValido) {
                    console.log("DDD inválido. Insira exatamente 2 dígitos.");
                }
                else {
                    break;
                }
            }
            var novoNumero = void 0;
            while (true) {
                novoNumero = this.entrada.receberTexto("Digite o novo número (formato 9999-9999 ou 99999-9999): ");
                var numeroValido = /^[0-9]{4,5}-[0-9]{4}$/.test(novoNumero);
                if (!numeroValido) {
                    console.log("Número de telefone inválido. Use o formato 9999-9999 ou 99999-9999.");
                }
                else {
                    break;
                }
            }
            this.cliente.Telefones[indice].Ddd = novoDdd;
            this.cliente.Telefones[indice].Numero = novoNumero;
            console.log("Telefone atualizado com sucesso!");
        }
        else {
            console.log("Índice inválido. Por favor, tente novamente.");
        }
    };
    return AtualizarTelefone;
}(processo_1.default));
exports.default = AtualizarTelefone;
