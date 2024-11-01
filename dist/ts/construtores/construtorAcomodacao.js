"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NomeAcomodacao_1 = require("../enumeracoes/NomeAcomodacao");
var acomodacao_1 = __importDefault(require("../modelos/acomodacao"));
var ConstrutorAcomodacao = /** @class */ (function () {
    function ConstrutorAcomodacao() {
        this.nomeAcomodacao = NomeAcomodacao_1.NomeAcomadacao.SolteiroSimples;
        this.camaSolteiro = 0;
        this.camaCasal = 0;
        this.suite = 0;
        this.climatizacao = false;
        this.garagem = 0;
    }
    Object.defineProperty(ConstrutorAcomodacao.prototype, "NomeAcomodacao", {
        set: function (nomeAcomodacao) { this.nomeAcomodacao = nomeAcomodacao; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConstrutorAcomodacao.prototype, "CamaSolteiro", {
        set: function (camaSolteiro) { this.camaSolteiro = camaSolteiro; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConstrutorAcomodacao.prototype, "CamaCasal", {
        set: function (camaCasal) { this.camaCasal = camaCasal; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConstrutorAcomodacao.prototype, "Suite", {
        set: function (suite) { this.suite = suite; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConstrutorAcomodacao.prototype, "Climatizacao", {
        set: function (climatizacao) { this.climatizacao = climatizacao; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConstrutorAcomodacao.prototype, "Garagem", {
        set: function (garagem) { this.garagem = garagem; },
        enumerable: false,
        configurable: true
    });
    ConstrutorAcomodacao.prototype.construir = function () {
        var acomodacao = new acomodacao_1.default(this.nomeAcomodacao, this.camaSolteiro, this.camaCasal, this.suite, this.climatizacao, this.garagem);
        return acomodacao;
    };
    return ConstrutorAcomodacao;
}());
exports.default = ConstrutorAcomodacao;
