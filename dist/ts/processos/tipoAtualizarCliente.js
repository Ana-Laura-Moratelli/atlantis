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
var processo_1 = __importDefault(require("../abstracoes/processo"));
var menuTipoAtualizarCliente_1 = __importDefault(require("../menus/menuTipoAtualizarCliente"));
var atualizarDependente_1 = __importDefault(require("./atualizar/atualizarDependente"));
var atualizarTitular_1 = __importDefault(require("./atualizar/atualizarTitular"));
var tipoAtualizarCliente = /** @class */ (function (_super) {
    __extends(tipoAtualizarCliente, _super);
    function tipoAtualizarCliente() {
        var _this = _super.call(this) || this;
        _this.menu = new menuTipoAtualizarCliente_1.default();
        return _this;
    }
    tipoAtualizarCliente.prototype.processar = function () {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero("Selecione a opção desejada:");
        switch (this.opcao) {
            case 1:
                this.processo = new atualizarTitular_1.default();
                this.processo.processar();
                break;
            case 2:
                this.processo = new atualizarDependente_1.default();
                this.processo.processar();
                break;
            default:
                console.log("Opção não entendida :(");
        }
    };
    return tipoAtualizarCliente;
}(processo_1.default));
exports.default = tipoAtualizarCliente;
