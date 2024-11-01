"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MenuTipoListagemClientes = /** @class */ (function () {
    function MenuTipoListagemClientes() {
    }
    MenuTipoListagemClientes.prototype.mostrar = function () {
        console.log("****************************");
        console.log("| Selecione a listagem desejada: ");
        console.log("----------------------");
        console.log("| 1 - Todos os titulares");
        console.log("| 2 - Todos os dependentes");
        console.log("| 3 - Titular de um dependente espec\u00EDfico");
        console.log("| 4 - Dependentes de um titular espec\u00EDfico");
        console.log("----------------------");
    };
    return MenuTipoListagemClientes;
}());
exports.default = MenuTipoListagemClientes;
