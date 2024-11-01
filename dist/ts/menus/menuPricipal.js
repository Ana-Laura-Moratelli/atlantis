"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MenuPrincipal = /** @class */ (function () {
    function MenuPrincipal() {
    }
    MenuPrincipal.prototype.mostrar = function () {
        console.log("****************************");
        console.log("| Selecione uma op\u00E7\u00E3o:");
        console.log("----------------------");
        console.log("| 1 - Cadastrar cliente");
        console.log("| 2 - Editar cliente");
        console.log("| 3 - Listar cliente(s)");
        console.log("| 4 - Excluir cliente");
        console.log("----------------------");
        console.log("| Op\u00E7\u00F5es para gest\u00E3o:");
        console.log("----------------------");
        console.log("| 5 - Listar acomoda\u00E7\u00F5es");
        console.log("| 6 - Fazer reserva");
        console.log("| 7 - Listar reservas");
        console.log("| 8 - Cancelar reserva");
        console.log("----------------------");
        console.log("****************************");
        console.log("| 0 - Sair");
        console.log("----------------------");
    };
    return MenuPrincipal;
}());
exports.default = MenuPrincipal;
