"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var entrada_1 = __importDefault(require("../io/entrada"));
var Processo = /** @class */ (function () {
    function Processo() {
        this.entrada = new entrada_1.default();
    }
    Object.defineProperty(Processo.prototype, "Execucao", {
        get: function () {
            return this.execucao;
        },
        enumerable: false,
        configurable: true
    });
    return Processo;
}());
exports.default = Processo;
