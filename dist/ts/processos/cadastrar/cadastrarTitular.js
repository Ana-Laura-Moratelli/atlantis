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
var cliente_1 = __importDefault(require("../../modelos/cliente"));
var cadastrarEndereco_1 = __importDefault(require("./cadastrarEndereco"));
var cadastrarTelefone_1 = __importDefault(require("./cadastrarTelefone"));
var cadastrarDocumento_1 = __importDefault(require("./cadastrarDocumento"));
var validacaoData_1 = require("../../utils/validacaoData");
var CadastrarTitular = /** @class */ (function (_super) {
    __extends(CadastrarTitular, _super);
    function CadastrarTitular() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CadastrarTitular.prototype.processar = function () {
        console.log('Cadastro Titular:');
        var nome = this.entrada.receberTexto('Nome:');
        var nomeSocial = this.entrada.receberTexto('Nome social:');
        var dataNascimento;
        while (true) {
            var entradaDataNascimento = this.entrada.receberTexto('Data de nascimento (formato: DD/MM/AAAA):');
            dataNascimento = (0, validacaoData_1.validarData)(entradaDataNascimento);
            if (dataNascimento === null) {
                console.log('Data de nascimento inválida. Insira uma data no formato DD/MM/AAAA.');
            }
            else {
                break;
            }
        }
        var cliente = new cliente_1.default(nome, nomeSocial, dataNascimento);
        this.processo = new cadastrarEndereco_1.default(cliente);
        this.processo.processar();
        this.processo = new cadastrarTelefone_1.default(cliente);
        this.processo.processar();
        this.processo = new cadastrarDocumento_1.default(cliente);
        this.processo.processar();
        var armazem = armazem_1.default.InstanciaUnica;
        armazem.Clientes.push(cliente);
        console.log('Cadastro realizado com sucesso.');
    };
    return CadastrarTitular;
}(processo_1.default));
exports.default = CadastrarTitular;
