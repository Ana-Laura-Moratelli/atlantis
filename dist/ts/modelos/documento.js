"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Documento = /** @class */ (function () {
    function Documento(numero, tipo, dataExpedicao) {
        this.numero = numero;
        this.tipo = tipo;
        this.dataExpedicao = dataExpedicao;
    }
    Object.defineProperty(Documento.prototype, "Numero", {
        get: function () {
            return this.numero;
        },
        set: function (numero) {
            this.numero = numero;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Documento.prototype, "Tipo", {
        get: function () {
            return this.tipo;
        },
        set: function (tipo) {
            this.tipo = tipo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Documento.prototype, "DataExpedicao", {
        get: function () {
            return this.dataExpedicao;
        },
        set: function (dataExpedicao) {
            this.dataExpedicao = dataExpedicao;
        },
        enumerable: false,
        configurable: true
    });
    return Documento;
}());
exports.default = Documento;
