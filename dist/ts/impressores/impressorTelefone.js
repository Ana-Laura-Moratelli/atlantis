"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImpressorTelefone = /** @class */ (function () {
    function ImpressorTelefone(telefone) {
        this.telefone = telefone;
    }
    ImpressorTelefone.prototype.imprimir = function () {
        var impressao = "| Telefone:\n"
            + "| DDD: ".concat(this.telefone.Ddd, "\n")
            + "| N\u00FAmero: ".concat(this.telefone.Numero);
        return impressao;
    };
    return ImpressorTelefone;
}());
exports.default = ImpressorTelefone;
