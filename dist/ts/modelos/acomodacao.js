"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Acomodacao = /** @class */ (function () {
    function Acomodacao(nomeAcomadacao, camaSolteiro, camaCasal, suite, climatizacao, garagem) {
        this.nomeAcomadacao = nomeAcomadacao;
        this.camaSolteiro = camaSolteiro;
        this.camaCasal = camaCasal;
        this.suite = suite;
        this.climatizacao = climatizacao;
        this.garagem = garagem;
    }
    Object.defineProperty(Acomodacao.prototype, "NomeAcomadacao", {
        get: function () { return this.nomeAcomadacao; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acomodacao.prototype, "CamaSolteiro", {
        get: function () { return this.camaSolteiro; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acomodacao.prototype, "CamaCasal", {
        get: function () { return this.camaCasal; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acomodacao.prototype, "Suite", {
        get: function () { return this.suite; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acomodacao.prototype, "Climatizacao", {
        get: function () { return this.climatizacao; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acomodacao.prototype, "Garagem", {
        get: function () { return this.garagem; },
        enumerable: false,
        configurable: true
    });
    return Acomodacao;
}());
exports.default = Acomodacao;
