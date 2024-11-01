"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var diretor_1 = __importDefault(require("../abstracoes/diretor"));
var construtorAcomodacao_1 = __importDefault(require("../construtores/construtorAcomodacao"));
var NomeAcomodacao_1 = require("../enumeracoes/NomeAcomodacao");
var DiretorFamiliaMais = /** @class */ (function (_super) {
    __extends(DiretorFamiliaMais, _super);
    function DiretorFamiliaMais() {
        var _this = _super.call(this) || this;
        _this.construtor = new construtorAcomodacao_1.default();
        return _this;
    }
    DiretorFamiliaMais.prototype.construir = function () {
        var objetoConstrutor = this.construtor;
        objetoConstrutor.NomeAcomodacao = NomeAcomodacao_1.NomeAcomadacao.FamiliaMais;
        objetoConstrutor.CamaCasal = 1;
        objetoConstrutor.CamaSolteiro = 5;
        objetoConstrutor.Climatizacao = true;
        objetoConstrutor.Garagem = 2;
        objetoConstrutor.Suite = 2;
        return objetoConstrutor.construir();
    };
    return DiretorFamiliaMais;
}(diretor_1.default));
exports.default = DiretorFamiliaMais;
