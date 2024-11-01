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
var DeletarTelefone = /** @class */ (function (_super) {
    __extends(DeletarTelefone, _super);
    function DeletarTelefone(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        _this.execucao = true;
        return _this;
    }
    DeletarTelefone.prototype.processar = function () {
        console.clear();
        console.log('Excluir telefone do cliente');
        console.log("Telefones cadastrados:");
        this.cliente.Telefones.forEach(function (telefone, index) {
            console.log("".concat(index + 1, " - (").concat(telefone.Ddd, ") ").concat(telefone.Numero));
        });
        var indexTelefone = this.entrada.receberNumero('Informe o índice do telefone que deseja excluir:') - 1;
        if (indexTelefone < 0 || indexTelefone >= this.cliente.Telefones.length) {
            console.log('Telefone não encontrado.');
            return;
        }
        this.cliente.Telefones.splice(indexTelefone, 1);
        console.log('Telefone excluído com sucesso!');
    };
    return DeletarTelefone;
}(processo_1.default));
exports.default = DeletarTelefone;
