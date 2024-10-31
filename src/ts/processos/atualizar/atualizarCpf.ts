import Processo from "../../abstracoes/processo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Armazem from "../../dominio/armazem";
import { validarData } from "../../utils/validacaoData"; 

export default class AtualizarCpf extends Processo {
    private cliente: Cliente;
    private clientes: Cliente[];

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        let cpfDocumento = this.cliente.Documentos.find(doc => doc.Tipo === TipoDocumento.CPF);

        if (!cpfDocumento) {
            console.log("CPF não encontrado para este cliente.");
            return;
        }

        let novoNumero: string;
        while (true) {
            novoNumero = this.entrada.receberTexto("Novo número do CPF (somente números, 11 dígitos):");
            const cpfValido = /^[0-9]{11}$/.test(novoNumero);

            if (!cpfValido) {
                console.log("CPF inválido. O CPF deve conter exatamente 11 dígitos numéricos.");
            } else {
                const cpfExistente = this.clientes.some(cliente =>
                    cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === novoNumero && doc !== cpfDocumento) ||
                    cliente.Dependentes.some(dependente =>
                        dependente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === novoNumero && doc !== cpfDocumento)
                    )
                );

                if (cpfExistente) {
                    console.log("CPF já cadastrado. Não é possível atualizar para um número duplicado.");
                } else {
                    break;
                }
            }
        }

        let novaDataExpedicao: Date | null;
        while (true) {
            const entradaData = this.entrada.receberTexto("Nova data de expedição (formato DD/MM/AAAA):");
            novaDataExpedicao = validarData(entradaData);

            if (novaDataExpedicao === null) {
                console.log("Data inválida. Insira uma data no formato DD/MM/AAAA.");
            } else {
                break;
            }
        }

        cpfDocumento.Numero = novoNumero;
        cpfDocumento.DataExpedicao = novaDataExpedicao;
        console.log("CPF atualizado com sucesso.");
    }
}
