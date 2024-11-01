"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var impressorDocumento_1 = __importDefault(require("./impressorDocumento"));
var ImpressorDocumentos = /** @class */ (function () {
    function ImpressorDocumentos(documentos) {
        this.documentos = documentos;
    }
    ImpressorDocumentos.prototype.imprimir = function () {
        var impressao = "";
        for (var index = 0; index < this.documentos.length; index++) {
            this.impressor = new impressorDocumento_1.default(this.documentos[index]);
            if (index == 0) {
                impressao = impressao + "".concat(this.impressor.imprimir());
            }
            else {
                impressao = impressao + "\n".concat(this.impressor.imprimir());
            }
        }
        return impressao;
    };
    return ImpressorDocumentos;
}());
exports.default = ImpressorDocumentos;
