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
var impressorEndereco_1 = __importDefault(require("../../impressores/impressorEndereco"));
var AtualizarEndereco = /** @class */ (function (_super) {
    __extends(AtualizarEndereco, _super);
    function AtualizarEndereco(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        return _this;
    }
    AtualizarEndereco.prototype.processar = function () {
        console.clear();
        console.log("Endereço atual:");
        var impressor = new impressorEndereco_1.default(this.cliente.Endereco);
        console.log(impressor.imprimir());
        var execucao = true;
        while (execucao) {
            console.log("Escolha a informação que deseja atualizar:");
            console.log("1 - Atualizar Rua");
            console.log("2 - Atualizar Bairro");
            console.log("3 - Atualizar Cidade");
            console.log("4 - Atualizar Estado");
            console.log("5 - Atualizar País");
            console.log("6 - Atualizar Código Postal");
            console.log("0 - Sair");
            var opcao = this.entrada.receberNumero("Digite o número da opção:");
            switch (opcao) {
                case 1:
                    var novaRua = this.entrada.receberTexto("Nova Rua:");
                    this.cliente.Endereco.Rua = novaRua;
                    console.log("Rua atualizada com sucesso!");
                    break;
                case 2:
                    var novoBairro = this.entrada.receberTexto("Novo Bairro:");
                    this.cliente.Endereco.Bairro = novoBairro;
                    console.log("Bairro atualizado com sucesso!");
                    break;
                case 3:
                    var novaCidade = this.entrada.receberTexto("Nova Cidade:");
                    this.cliente.Endereco.Cidade = novaCidade;
                    console.log("Cidade atualizada com sucesso!");
                    break;
                case 4:
                    var novoEstado = this.entrada.receberTexto("Novo Estado:");
                    this.cliente.Endereco.Estado = novoEstado;
                    console.log("Estado atualizado com sucesso!");
                    break;
                case 5:
                    var novoPais = this.entrada.receberTexto("Novo País:");
                    this.cliente.Endereco.Pais = novoPais;
                    console.log("País atualizado com sucesso!");
                    break;
                case 6:
                    var novoCodigoPostal = void 0;
                    while (true) {
                        novoCodigoPostal = this.entrada.receberTexto("Novo Código Postal (formato 99999-999):");
                        var codigoPostalValido = /^[0-9]{5}-[0-9]{3}$/.test(novoCodigoPostal);
                        if (!codigoPostalValido) {
                            console.log("Código postal inválido. O código postal deve estar no formato 99999-999.");
                        }
                        else {
                            this.cliente.Endereco.CodigoPostal = novoCodigoPostal;
                            console.log("Código Postal atualizado com sucesso!");
                            break;
                        }
                    }
                    break;
                case 0:
                    execucao = false;
                    console.log("Endereço atualizado com sucesso!");
                    break;
                default:
                    console.log("Opção não entendida. Tente novamente.");
            }
        }
    };
    return AtualizarEndereco;
}(processo_1.default));
exports.default = AtualizarEndereco;
