import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";

export default class ListagemTitularDependente extends Processo {
    private clientes: Cliente[];
    private impressor!: Impressor;
    
    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }
    
    processar(): void {

        if (this.clientes.length === 0) {
            console.log("Não há titulares cadastrados.");
            return;
        }

        console.log('1 - Listar todos os titulares');
        console.log('2 - Buscar por CPF do titular');
        const opcao = this.entrada.receberNumero("Escolha uma opção: ");

        let clienteTitular: Cliente | null = null;

        switch (opcao) {
            case 1:
                clienteTitular = this.selecionarTitularPorIndice();
                break;
            case 2:
                clienteTitular = this.selecionarTitularPorCPF();
                break;
            default:
                console.log("Opção inválida. Operação cancelada.");
                return;
        }

        if (!clienteTitular) {
            console.log("Titular não encontrado.");
            return;
        }

        if (clienteTitular.Dependentes.length === 0) {
            console.log(`O titular ${clienteTitular.Nome} não possui dependentes.`);
            return;
        }

        console.log(`Dependentes do titular ${clienteTitular.Nome}:`);
        clienteTitular.Dependentes.forEach(dependente => {
            this.impressor = new ImpressaorCliente(dependente);
            console.log(this.impressor.imprimir());
        });
    }

    private selecionarTitularPorIndice(): Cliente | null {
        console.log("Lista de Titulares:");
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`);
        });

        const indiceTitular = this.entrada.receberNumero("Digite o número do titular (ou 0 para cancelar):");

        if (indiceTitular === 0) {
            console.log("Operação cancelada.");
            return null;
        }

        if (indiceTitular < 1 || indiceTitular > this.clientes.length) {
            console.log("Índice de titular inválido. Tente novamente.");
            return null;
        }

        return this.clientes[indiceTitular - 1];
    }

    private selecionarTitularPorCPF(): Cliente | null {
        const cpfTitular = this.entrada.receberTexto("Digite o CPF do titular: ");
        const clienteTitular = this.clientes.find(cliente =>
            cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === cpfTitular)
        );

        return clienteTitular || null;
    }
}
