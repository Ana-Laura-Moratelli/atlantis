import Processo from "../../abstracoes/processo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Armazem from "../../dominio/armazem";
import { validarData } from "../../utils/validacaoData"; 

export default class AtualizarRg extends Processo {
    private cliente: Cliente;
    private clientes: Cliente[];

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        let rgDocumento = this.cliente.Documentos.find(doc => doc.Tipo === TipoDocumento.RG);

        if (!rgDocumento) {
            console.log("RG não encontrado para este cliente.");
            return;
        }

        let novoNumero: string;
        while (true) {
            novoNumero = this.entrada.receberTexto("Novo número do RG (somente números, 9 dígitos):");
            const rgValido = /^[0-9]{9}$/.test(novoNumero);

            if (!rgValido) {
                console.log("RG inválido. O RG deve conter exatamente 9 dígitos numéricos.");
            } else {
                const rgExistente = this.clientes.some(cliente =>
                    cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.RG && doc.Numero === novoNumero && doc !== rgDocumento) ||
                    cliente.Dependentes.some(dependente =>
                        dependente.Documentos.some(doc => doc.Tipo === TipoDocumento.RG && doc.Numero === novoNumero && doc !== rgDocumento)
                    )
                );

                if (rgExistente) {
                    console.log("RG já cadastrado. Não é possível atualizar para um número duplicado.");
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

        rgDocumento.Numero = novoNumero;
        rgDocumento.DataExpedicao = novaDataExpedicao;
        console.log("RG atualizado com sucesso.");
    }
}
