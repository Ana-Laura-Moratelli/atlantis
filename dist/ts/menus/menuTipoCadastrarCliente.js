"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MenuTipoCadastrarCliente = /** @class */ (function () {
    function MenuTipoCadastrarCliente() {
    }
    MenuTipoCadastrarCliente.prototype.mostrar = function () {
        console.clear();
        console.log("****************************");
        console.log("| Selecione o que tipo de cliente que deseja cadastrar: ");
        console.log("----------------------");
        console.log("| 1 - Titular");
        console.log("| 2 - Dependente");
        console.log("----------------------");
    };
    return MenuTipoCadastrarCliente;
}());
exports.default = MenuTipoCadastrarCliente;
