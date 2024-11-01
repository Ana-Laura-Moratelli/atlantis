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
var menuTipoAtualizarTitular_1 = __importDefault(require("../../menus/menuTipoAtualizarTitular"));
var cadastrarDocumento_1 = __importDefault(require("../cadastrar/cadastrarDocumento"));
var cadastrarTelefone_1 = __importDefault(require("../cadastrar/cadastrarTelefone"));
var deletarDocumento_1 = __importDefault(require("../deletar/deletarDocumento"));
var deletarTelefone_1 = __importDefault(require("../deletar/deletarTelefone"));
var atualizarDataNascimento_1 = __importDefault(require("./atualizarDataNascimento"));
var atualizarDocumento_1 = __importDefault(require("./atualizarDocumento"));
var atualizarEndereco_1 = __importDefault(require("./atualizarEndereco"));
var atualizarNome_1 = __importDefault(require("./atualizarNome"));
var atualizarNomeSocial_1 = __importDefault(require("./atualizarNomeSocial"));
var atualizarTelefone_1 = __importDefault(require("./atualizarTelefone"));
var AtualizarTitular = /** @class */ (function (_super) {
    __extends(AtualizarTitular, _super);
    function AtualizarTitular() {
        var _this = _super.call(this) || this;
        _this.menu = new menuTipoAtualizarTitular_1.default();
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        return _this;
    }
    AtualizarTitular.prototype.processar = function () {
        if (this.clientes.length === 0) {
            console.log("Não há titulares cadastrados.");
            return;
        }
        console.log("Lista de titulares disponíveis:");
        this.clientes.forEach(function (cliente, index) {
            console.log("".concat(index + 1, " - Titular: ").concat(cliente.Nome));
        });
        var indiceTitular = this.entrada.receberNumero("Escolha o número do titular para editar:");
        if (indiceTitular < 1 || indiceTitular > this.clientes.length) {
            console.log("Índice inválido. Tente novamente.");
            return;
        }
        var clienteTitular = this.clientes[indiceTitular - 1];
        var execucao = true;
        while (execucao) {
            this.menu.mostrar();
            var opcao = this.entrada.receberNumero("Escolha uma opção:");
            switch (opcao) {
                case 1:
                    this.processo = new atualizarNome_1.default(clienteTitular);
                    this.processo.processar();
                    break;
                case 2:
                    this.processo = new atualizarNomeSocial_1.default(clienteTitular);
                    this.processo.processar();
                    break;
                case 3:
                    this.processo = new atualizarDataNascimento_1.default(clienteTitular);
                    this.processo.processar();
                    break;
                case 4:
                    this.processo = new atualizarEndereco_1.default(clienteTitular);
                    this.processo.processar();
                    break;
                case 5:
                    this.processo = new atualizarDocumento_1.default(clienteTitular);
                    this.processo.processar();
                    break;
                case 6:
                    this.processo = new atualizarTelefone_1.default(clienteTitular);
                    this.processo.processar();
                    break;
                case 7:
                    this.processo = new cadastrarDocumento_1.default(clienteTitular);
                    this.processo.processar();
                    break;
                case 8:
                    this.processo = new cadastrarTelefone_1.default(clienteTitular);
                    this.processo.processar();
                    break;
                case 9:
                    this.processo = new deletarDocumento_1.default(clienteTitular);
                    this.processo.processar();
                    break;
                case 10:
                    this.processo = new deletarTelefone_1.default(clienteTitular);
                    this.processo.processar();
                    break;
                case 0:
                    execucao = false;
                    console.log("Titular atualizado com sucesso!");
                    break;
                default:
                    console.log("Opção não entendida. Tente novamente.");
            }
        }
    };
    return AtualizarTitular;
}(processo_1.default));
exports.default = AtualizarTitular;
