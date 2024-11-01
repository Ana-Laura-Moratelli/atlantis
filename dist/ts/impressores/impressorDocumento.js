"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImpressorDocumento = /** @class */ (function () {
    function ImpressorDocumento(documento) {
        this.documento = documento;
    }
    ImpressorDocumento.prototype.imprimir = function () {
        var impressao = "| Documento:\n"
            + "| Tipo: ".concat(this.documento.Tipo, "\n")
            + "| Data expedi\u00E7\u00E3o: ".concat(this.documento.DataExpedicao.toLocaleDateString(), "\n")
            + "| N\u00FAmero: ".concat(this.documento.Numero);
        return impressao;
    };
    return ImpressorDocumento;
}());
exports.default = ImpressorDocumento;
