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
var menuPricipal_1 = __importDefault(require("../menus/menuPricipal"));
var tipoCadastrarCliente_1 = __importDefault(require("./tipoCadastrarCliente"));
var tipoAtualizarCliente_1 = __importDefault(require("./tipoAtualizarCliente"));
var tipoListagemClientes_1 = __importDefault(require("./tipoListagemClientes"));
var tipoDeletarCliente_1 = __importDefault(require("./tipoDeletarCliente"));
var listagemAcomodacoes_1 = __importDefault(require("./listagem/listagemAcomodacoes"));
var Principal = /** @class */ (function (_super) {
    __extends(Principal, _super);
    function Principal() {
        var _this = _super.call(this) || this;
        _this.execucao = true;
        _this.menu = new menuPricipal_1.default();
        return _this;
    }
    Principal.prototype.processar = function () {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new tipoCadastrarCliente_1.default();
                this.processo.processar();
                break;
            case 2:
                this.processo = new tipoAtualizarCliente_1.default();
                this.processo.processar();
                break;
            case 3:
                this.processo = new tipoListagemClientes_1.default();
                this.processo.processar();
                break;
            case 4:
                this.processo = new tipoDeletarCliente_1.default();
                this.processo.processar();
                break;
            case 5:
                this.processo = new listagemAcomodacoes_1.default();
                this.processo.processar();
                break;
            case 0:
                this.execucao = false;
                console.log('Até logo!');
                console.clear();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    };
    return Principal;
}(processo_1.default));
exports.default = Principal;
