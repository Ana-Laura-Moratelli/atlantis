"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var impressorTelefone_1 = __importDefault(require("./impressorTelefone"));
var ImpressorTelefones = /** @class */ (function () {
    function ImpressorTelefones(telefones) {
        this.telefones = telefones;
    }
    ImpressorTelefones.prototype.imprimir = function () {
        var impressao = "";
        for (var index = 0; index < this.telefones.length; index++) {
            this.impressor = new impressorTelefone_1.default(this.telefones[index]);
            if (index == 0) {
                impressao = impressao + "".concat(this.impressor.imprimir());
            }
            else {
                impressao = impressao + "\n".concat(this.impressor.imprimir());
            }
        }
        return impressao;
    };
    return ImpressorTelefones;
}());
exports.default = ImpressorTelefones;
