"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var principal_1 = __importDefault(require("../processos/principal"));
console.clear();
console.log("Bem-vindo(a) ao melhor sistema de gest\u00E3o de clubes, hot\u00E9is e resorts do mundo, o Atlantis :)");
var processo;
var execucao = true;
while (execucao) {
    processo = new principal_1.default();
    processo.processar();
    execucao = processo.Execucao;
}
