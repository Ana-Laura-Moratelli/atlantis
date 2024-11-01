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
var processo_1 = __importDefault(require("../../abstracoes/processo"));
var diretorCasalSimples_1 = __importDefault(require("../../diretores/diretorCasalSimples"));
var diretorFamiliaMais_1 = __importDefault(require("../../diretores/diretorFamiliaMais"));
var diretorFamiliaSimples_1 = __importDefault(require("../../diretores/diretorFamiliaSimples"));
var diretorFamiliaSuper_1 = __importDefault(require("../../diretores/diretorFamiliaSuper"));
var diretorSolteiroMais_1 = __importDefault(require("../../diretores/diretorSolteiroMais"));
var diretorSolteiroSimples_1 = __importDefault(require("../../diretores/diretorSolteiroSimples"));
var armazem_1 = __importDefault(require("../../dominio/armazem"));
var CadastroAcomodacoes = /** @class */ (function (_super) {
    __extends(CadastroAcomodacoes, _super);
    function CadastroAcomodacoes() {
        var _this = _super.call(this) || this;
        _this.acomodacoes = armazem_1.default.InstanciaUnica.Acomodacoes;
        return _this;
    }
    CadastroAcomodacoes.prototype.processar = function () {
        var diretor = new diretorCasalSimples_1.default();
        this.acomodacoes.push(diretor.construir());
        diretor = new diretorFamiliaSimples_1.default();
        this.acomodacoes.push(diretor.construir());
        diretor = new diretorFamiliaMais_1.default();
        this.acomodacoes.push(diretor.construir());
        diretor = new diretorFamiliaSuper_1.default();
        this.acomodacoes.push(diretor.construir());
        diretor = new diretorSolteiroSimples_1.default();
        this.acomodacoes.push(diretor.construir());
        diretor = new diretorSolteiroMais_1.default();
        this.acomodacoes.push(diretor.construir());
    };
    return CadastroAcomodacoes;
}(processo_1.default));
exports.default = CadastroAcomodacoes;
