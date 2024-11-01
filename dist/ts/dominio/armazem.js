"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Armazem = /** @class */ (function () {
    function Armazem() {
        this.clientes = [];
        this.acomodacoes = [];
    }
    Object.defineProperty(Armazem, "InstanciaUnica", {
        get: function () {
            return this.instanciaUnica;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Armazem.prototype, "Clientes", {
        get: function () {
            return this.clientes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Armazem.prototype, "Acomodacoes", {
        get: function () {
            return this.acomodacoes;
        },
        enumerable: false,
        configurable: true
    });
    Armazem.instanciaUnica = new Armazem();
    return Armazem;
}());
exports.default = Armazem;
