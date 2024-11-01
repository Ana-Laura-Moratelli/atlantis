"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImpressorAcomodacao = /** @class */ (function () {
    function ImpressorAcomodacao(acomodacao) {
        this.acomodacao = acomodacao;
    }
    ImpressorAcomodacao.prototype.imprimir = function () {
        var descricao = "Nomenclatura: ".concat(this.acomodacao.NomeAcomadacao.toString(), "\n")
            + "-- Quantidade de leitos para solteiros: ".concat(this.acomodacao.CamaSolteiro, "\n")
            + "-- Quantidade de leitos para casais: ".concat(this.acomodacao.CamaCasal, "\n")
            + "-- Climatiza\u00E7\u00E3o: ".concat(this.converterBooleano(this.acomodacao.Climatizacao), "\n")
            + "-- Quantidade de garagens dispon\u00EDveis: ".concat(this.acomodacao.Garagem, "\n")
            + "-- Quantidade de suites: ".concat(this.acomodacao.Suite, "\n");
        return descricao;
    };
    ImpressorAcomodacao.prototype.converterBooleano = function (valor) {
        if (valor) {
            return "sim";
        }
        else {
            return "n\u00E3o";
        }
    };
    return ImpressorAcomodacao;
}());
exports.default = ImpressorAcomodacao;
