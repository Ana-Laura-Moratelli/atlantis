import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import { validarData } from "../../utils/validacaoData"; 

export default class AtualizarPassaporte extends Processo {
    private cliente: Cliente;
    private clientes: Cliente[];

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        let passaporteDocumento = this.cliente.Documentos.find(doc => doc.Tipo === TipoDocumento.Passaporte);

        if (!passaporteDocumento) {
            console.log("Passaporte não encontrado para este cliente.");
            return;
        }

        let novoNumero: string;
        while (true) {
            novoNumero = this.entrada.receberTexto("Novo número do passaporte (duas letras seguidas de seis dígitos):");
            const passaporteValido = /^[A-Za-z]{2}[0-9]{6}$/.test(novoNumero);

            if (!passaporteValido) {
                console.log("Número de passaporte inválido. Deve conter duas letras seguidas de seis dígitos.");
            } else {
                const passaporteExistente = this.clientes.some(cliente =>
                    cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.Passaporte && doc.Numero === novoNumero && doc !== passaporteDocumento) ||
                    cliente.Dependentes.some(dependente =>
                        dependente.Documentos.some(doc => doc.Tipo === TipoDocumento.Passaporte && doc.Numero === novoNumero && doc !== passaporteDocumento)
                    )
                );

                if (passaporteExistente) {
                    console.log("Passaporte já cadastrado. Não é possível atualizar para um número duplicado.");
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

        passaporteDocumento.Numero = novoNumero;
        passaporteDocumento.DataExpedicao = novaDataExpedicao;
        console.log("Passaporte atualizado com sucesso.");
    }
}
