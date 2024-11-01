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
var DiretorFamiliaSuper = /** @class */ (function (_super) {
    __extends(DiretorFamiliaSuper, _super);
    function DiretorFamiliaSuper() {
        var _this = _super.call(this) || this;
        _this.construtor = new construtorAcomodacao_1.default();
        return _this;
    }
    DiretorFamiliaSuper.prototype.construir = function () {
        var objetoConstrutor = this.construtor;
        objetoConstrutor.NomeAcomodacao = NomeAcomodacao_1.NomeAcomadacao.FamiliaSuper;
        objetoConstrutor.CamaCasal = 2;
        objetoConstrutor.CamaSolteiro = 6;
        objetoConstrutor.Climatizacao = true;
        objetoConstrutor.Garagem = 2;
        objetoConstrutor.Suite = 3;
        return objetoConstrutor.construir();
    };
    return DiretorFamiliaSuper;
}(diretor_1.default));
exports.default = DiretorFamiliaSuper;
