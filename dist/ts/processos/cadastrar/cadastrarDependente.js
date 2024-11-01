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
var TipoDocumento_1 = require("../../enumeracoes/TipoDocumento");
var cadastrarEndereco_1 = __importDefault(require("./cadastrarEndereco"));
var cadastrarTelefone_1 = __importDefault(require("./cadastrarTelefone"));
var cadastrarDocumento_1 = __importDefault(require("./cadastrarDocumento"));
var validacaoData_1 = require("../../utils/validacaoData");
var CadastrarDependente = /** @class */ (function (_super) {
    __extends(CadastrarDependente, _super);
    function CadastrarDependente() {
        var _this = _super.call(this) || this;
        _this.clientes = armazem_1.default.InstanciaUnica.Clientes;
        return _this;
    }
    CadastrarDependente.prototype.processar = function () {
        if (this.clientes.length === 0) {
            console.log("Nenhum titular cadastrado.");
            return;
        }
        console.log('1 - Listar todos os titulares');
        console.log('2 - Buscar por CPF do titular');
        var opcao = this.entrada.receberTexto("Escolha uma opção: ").trim();
        var clienteTitular;
        if (opcao === '1') {
            console.log("Lista dos titulares");
            this.clientes.forEach(function (cliente, index) {
                console.log("".concat(index + 1, " - ").concat(cliente.Nome));
            });
            var indiceCliente = parseInt(this.entrada.receberTexto("Selecione o número do titular para cadastrar o dependente: ").trim());
            if (indiceCliente > 0 && indiceCliente <= this.clientes.length) {
                clienteTitular = this.clientes[indiceCliente - 1];
            }
            else {
                console.log("Número de cliente inválido.");
                return;
            }
        }
        else if (opcao === '2') {
            var cpfTitular_1 = this.entrada.receberTexto("CPF do titular:");
            clienteTitular = this.clientes.find(function (cliente) {
                return cliente.Documentos.some(function (dadosCPF) {
                    return dadosCPF.Numero === cpfTitular_1 && dadosCPF.Tipo === TipoDocumento_1.TipoDocumento.CPF;
                });
            });
            if (!clienteTitular) {
                console.log("Titular não encontrado :(");
                return;
            }
        }
        else {
            console.log("Opção inválida. Tente novamente.");
            return;
        }
        this.execucao = true;
        while (this.execucao) {
            console.log("Cadastro dependente");
            var nome = this.entrada.receberTexto("Nome:");
            var nomeSocial = this.entrada.receberTexto("Nome social:");
            var dataNascimento = void 0;
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
            var clienteDependente = new cliente_1.default(nome, nomeSocial, dataNascimento);
            clienteTitular.Dependentes.push(clienteDependente);
            this.processo = new cadastrarEndereco_1.default(clienteDependente);
            this.processo.processar();
            this.processo = new cadastrarTelefone_1.default(clienteDependente);
            this.processo.processar();
            this.processo = new cadastrarDocumento_1.default(clienteDependente);
            this.processo.processar();
            var cadastrarOutro = this.entrada.receberTexto("Deseja cadastrar outro dependente? (S/N)").trim().toLowerCase();
            if (cadastrarOutro !== 's') {
                this.execucao = false;
            }
        }
        console.log("Cadastro de dependente finalizado");
    };
    return CadastrarDependente;
}(processo_1.default));
exports.default = CadastrarDependente;
