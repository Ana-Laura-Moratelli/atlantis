"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImpressorEndereco = /** @class */ (function () {
    function ImpressorEndereco(endereco) {
        this.endereco = endereco;
    }
    ImpressorEndereco.prototype.imprimir = function () {
        var impressao = "| Endereco:\n"
            + "| rua: ".concat(this.endereco.Rua, "\n")
            + "| bairro: ".concat(this.endereco.Bairro, "\n")
            + "| cidade: ".concat(this.endereco.Cidade, "\n")
            + "| estado: ".concat(this.endereco.Estado, "\n")
            + "| pa\u00EDs: ".concat(this.endereco.Pais, "\n")
            + "| c\u00F3digo postal: ".concat(this.endereco.Pais);
        return impressao;
    };
    return ImpressorEndereco;
}());
exports.default = ImpressorEndereco;
