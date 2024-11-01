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
var impressorDocumento_1 = __importDefault(require("../../impressores/impressorDocumento"));
var DeletarDocumento = /** @class */ (function (_super) {
    __extends(DeletarDocumento, _super);
    function DeletarDocumento(cliente) {
        var _this = _super.call(this) || this;
        _this.cliente = cliente;
        _this.execucao = true;
        return _this;
    }
    DeletarDocumento.prototype.processar = function () {
        console.clear();
        console.log('Excluir documento do cliente');
        console.log("Documentos cadastrados:");
        this.cliente.Documentos.forEach(function (documento, index) {
            var impressor = new impressorDocumento_1.default(documento);
            console.log("".concat(index + 1, " - ").concat(impressor.imprimir()));
        });
        var indexDocumento = this.entrada.receberNumero('Informe o índice do documento que deseja excluir:') - 1;
        if (indexDocumento < 0 || indexDocumento >= this.cliente.Documentos.length) {
            console.log('Documento não encontrado.');
            return;
        }
        this.cliente.Documentos.splice(indexDocumento, 1);
        console.log('Documento excluído com sucesso!');
    };
    return DeletarDocumento;
}(processo_1.default));
exports.default = DeletarDocumento;
