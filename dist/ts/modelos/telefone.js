"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Telefone = /** @class */ (function () {
    function Telefone(ddd, numero) {
        this.ddd = ddd;
        this.numero = numero;
    }
    Object.defineProperty(Telefone.prototype, "Ddd", {
        get: function () { return this.ddd; },
        set: function (ddd) { this.ddd = ddd; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Telefone.prototype, "Numero", {
        get: function () { return this.numero; },
        set: function (numero) { this.numero = numero; },
        enumerable: false,
        configurable: true
    });
    Telefone.prototype.clonar = function () {
        var telefone = new Telefone(this.ddd, this.numero);
        return telefone;
    };
    return Telefone;
}());
exports.default = Telefone;
