import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";

export default class ListagemDependenteTitular extends Processo {
    private clientes: Cliente[];
    private impressor!: Impressor;

    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {

        if (this.clientes.length === 0) {
            console.log("Não há dependentes cadastrados.");
            return;
        }

        console.log('1 - Listar todos os dependentes');
        console.log('2 - Buscar por CPF do dependente');
        const opcao = this.entrada.receberNumero("Escolha uma opção: ");

        switch (opcao) {
            case 1:
                this.listarTodosDependentes();
                break;
            case 2:
                this.listarDependentePorCPF();
                break;
            default:
                console.log("Opção inválida. Operação cancelada.");
                return;
        }
    }

    private listarTodosDependentes(): void {
        const dependentesMap: { dependente: Cliente, titular: Cliente }[] = [];

        this.clientes.forEach(cliente => {
            if (cliente.Dependentes.length > 0) {
                cliente.Dependentes.forEach(dependente => {
                    dependentesMap.push({ dependente, titular: cliente });
                });
            }
        });

        if (dependentesMap.length === 0) {
            console.log("Não há dependentes cadastrados.");
            return;
        }

        console.log("Listando todos os dependentes:");
        dependentesMap.forEach((entry, index) => {
            this.impressor = new ImpressaorCliente(entry.dependente);
            console.log(`${index + 1} - ${this.impressor.imprimir()}`);
        });

        const indiceDependente = this.entrada.receberNumero("Digite o número do dependente para ver o titular (ou 0 para cancelar):");

        if (indiceDependente === 0) {
            console.log("Operação cancelada.");
            return;
        }

        if (indiceDependente < 1 || indiceDependente > dependentesMap.length) {
            console.log("Índice inválido. Tente novamente.");
            return;
        }

        const dependenteSelecionado = dependentesMap[indiceDependente - 1];
        
        this.impressor = new ImpressaorCliente(dependenteSelecionado.titular);
        console.log(`O titular do dependente ${dependenteSelecionado.dependente.Nome} é:`);
        console.log(this.impressor.imprimir());
    }

    private listarDependentePorCPF(): void {
        const cpfDependente = this.entrada.receberTexto("Digite o CPF do dependente: ");
        let clienteTitular: Cliente | null = null;

        for (const cliente of this.clientes) {
            for (const dependente of cliente.Dependentes) {
                if (dependente.Documentos.some(doc => doc.Numero === cpfDependente && doc.Tipo === TipoDocumento.CPF)) {
                    clienteTitular = cliente;
                    
                    this.impressor = new ImpressaorCliente(clienteTitular);
                    console.log(`Dependente encontrado: ${dependente.Nome}`);
                    console.log(`Titular relacionado:`);
                    console.log(this.impressor.imprimir()); 
                    return;
                }
            }
        }

        if (!clienteTitular) {
            console.log("Dependente não encontrado.");
        }
    }
}
