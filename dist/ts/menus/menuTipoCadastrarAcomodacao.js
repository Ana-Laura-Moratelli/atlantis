"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MenuTipoCadastroAcomodacao = /** @class */ (function () {
    function MenuTipoCadastroAcomodacao() {
    }
    MenuTipoCadastroAcomodacao.prototype.mostrar = function () {
        console.clear();
        console.log("****************************");
        console.log("| Selecione o tipo de acomoda\u00E7\u00E3o: ");
        console.log("----------------------");
        console.log("| 1 - Casal Simples");
        console.log("| 2 - Fam\u00EDlia Simples");
        console.log("| 3 - Fam\u00EDlia Mais");
        console.log("| 4 - Fam\u00EDlia Super");
        console.log("| 5 - Solteiro Simples");
        console.log("| 6 - Solteiro Mais");
        console.log("----------------------");
    };
    return MenuTipoCadastroAcomodacao;
}());
exports.default = MenuTipoCadastroAcomodacao;
