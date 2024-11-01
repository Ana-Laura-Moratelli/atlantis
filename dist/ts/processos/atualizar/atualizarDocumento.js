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
var menuTipoDocumento_1 = __importDefault(require("../../menus/menuTipoDocumento"));
var atualizarCpf_1 = __importDefault(require("./atualizarCpf"));
var atualizarRg_1 = __importDefault(require("./atualizarRg"));
var atualizarPassaporte_1 = __importDefault(require("./atualizarPassaporte"));
var AtualizarDocumentos = /** @class */ (function (_super) {
    __extends(AtualizarDocumentos, _super);
    function AtualizarDocumentos(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        _this.menu = new menuTipoDocumento_1.default();
        _this.execucao = true;
        return _this;
    }
    AtualizarDocumentos.prototype.processar = function () {
        console.log("Atualização de documento");
        while (this.execucao) {
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero("Qual opção desejada?");
            switch (this.opcao) {
                case 1:
                    this.processo = new atualizarCpf_1.default(this.cliente);
                    this.processo.processar();
                    break;
                case 2:
                    this.processo = new atualizarRg_1.default(this.cliente);
                    this.processo.processar();
                    break;
                case 3:
                    this.processo = new atualizarPassaporte_1.default(this.cliente);
                    this.processo.processar();
                    break;
                case 0:
                    this.execucao = false;
                    console.log("Atualização de documento finalizada.");
                    break;
                default:
                    console.log("Opção não entendida :(");
            }
        }
    };
    return AtualizarDocumentos;
}(processo_1.default));
exports.default = AtualizarDocumentos;
