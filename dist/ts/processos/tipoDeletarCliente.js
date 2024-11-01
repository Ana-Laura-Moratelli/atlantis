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
var menuTipoDeletarCliente_1 = __importDefault(require("../menus/menuTipoDeletarCliente"));
var deletarTitular_1 = __importDefault(require("./deletar/deletarTitular"));
var deletarDependente_1 = __importDefault(require("./deletar/deletarDependente"));
var TipoDeletarCliente = /** @class */ (function (_super) {
    __extends(TipoDeletarCliente, _super);
    function TipoDeletarCliente() {
        var _this = _super.call(this) || this;
        _this.menu = new menuTipoDeletarCliente_1.default();
        return _this;
    }
    TipoDeletarCliente.prototype.processar = function () {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Selecione a opção desejada:');
        switch (this.opcao) {
            case 1:
                this.processo = new deletarTitular_1.default();
                this.processo.processar();
                break;
            case 2:
                this.processo = new deletarDependente_1.default();
                this.processo.processar();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    };
    return TipoDeletarCliente;
}(processo_1.default));
exports.default = TipoDeletarCliente;
