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
var armazem_1 = __importDefault(require("../../dominio/armazem"));
var impressorCliente_1 = __importDefault(require("../../impressores/impressorCliente"));
var ListagemTitulares = /** @class */ (function (_super) {
    __extends(ListagemTitulares, _super);
    function ListagemTitulares() {
        var _this = _super.call(this) || this;
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        return _this;
    }
    ListagemTitulares.prototype.processar = function () {
        var _this = this;
        if (this.clientes.length === 0) {
            console.log("Não há titulares cadastrados.");
            return;
        }
        console.log('Listagem dos clientes titulares');
        this.clientes.forEach(function (cliente) {
            if (_this.titular(cliente)) {
                _this.impressor = new impressorCliente_1.default(cliente);
                console.log(_this.impressor.imprimir());
            }
        });
    };
    ListagemTitulares.prototype.titular = function (cliente) {
        var verificacao = false;
        if (cliente.Titular == undefined) {
            verificacao = true;
        }
        return verificacao;
    };
    return ListagemTitulares;
}(processo_1.default));
exports.default = ListagemTitulares;
