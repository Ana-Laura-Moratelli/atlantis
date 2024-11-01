"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MenuTipoDocumento = /** @class */ (function () {
    function MenuTipoDocumento() {
    }
    MenuTipoDocumento.prototype.mostrar = function () {
        console.log("****************************");
        console.log("| Selecione o que tipo de documento: ");
        console.log("----------------------");
        console.log("| 1 - Cadastro de Pessoas F\u00EDsica");
        console.log("| 2 - Registro Geral");
        console.log("| 3 - Passaporte");
        console.log("****************************");
        console.log("| 0 - Finalizar cadastro de documentos");
        console.log("----------------------");
    };
    return MenuTipoDocumento;
}());
exports.default = MenuTipoDocumento;
