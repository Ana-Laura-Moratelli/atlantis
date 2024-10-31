import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import MenuEditarClienteDependente from "../../menus/menuTipoAtualizarDependente";
import Cliente from "../../modelos/cliente";
import CadastrarDocumentos from "../cadastrar/cadastrarDocumento";
import CadastrarTelefone from "../cadastrar/cadastrarTelefone";
import DeletarDocumento from "../deletar/deletarDocumento";
import DeletarTelefone from "../deletar/deletarTelefone";
import AtualizarDataNascimento from "./atualizarDataNascimento";
import AtualizarDocumento from "./atualizarDocumento";
import AtualizarEndereco from "./atualizarEndereco";
import AtualizarNome from "./atualizarNome";
import AtualizarNomeSocial from "./atualizarNomeSocial";
import AtualizarTelefone from "./atualizarTelefone";

export default class AtualizarDependente extends Processo {
    private clientes: Cliente[];

    constructor() {
        super();
        this.menu = new MenuEditarClienteDependente();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {

        if (this.clientes.length === 0) {
            console.log("Não há titulares cadastrados.");
            return;
        }

        console.log("Titulares disponíveis:");
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`);
        });

        let indiceTitular = this.entrada.receberNumero("Escolha o número do titular para listar seus dependentes:") - 1;

        if (indiceTitular < 0 || indiceTitular >= this.clientes.length) {
            console.log("Titular inválido. Tente novamente.");
            return;
        }

        let clienteTitular = this.clientes[indiceTitular];

        if (clienteTitular.Dependentes.length === 0) {
            console.log("O titular selecionado não possui dependentes cadastrados.");
            return;
        }

        console.log("Dependentes do cliente:");
        clienteTitular.Dependentes.forEach((dependente, index) => {
            console.log(`${index + 1} - ${dependente.Nome}`);
        });

        let indiceDependente = this.entrada.receberNumero("Escolha o número do dependente que deseja editar:") - 1;

        if (indiceDependente < 0 || indiceDependente >= clienteTitular.Dependentes.length) {
            console.log("Dependente inválido. Tente novamente.");
            return;
        }

        let clienteDependente = clienteTitular.Dependentes[indiceDependente];

        let execucao = true;

        while (execucao) {
            this.menu.mostrar();
            let opcao = this.entrada.receberNumero("Escolha uma opção:");

            switch (opcao) {
                case 1:
                    this.processo = new AtualizarNome(clienteDependente);
                    this.processo.processar();
                    break;
                case 2:
                    this.processo = new AtualizarNomeSocial(clienteDependente);
                    this.processo.processar();
                    break;
                case 3:
                    this.processo = new AtualizarDataNascimento(clienteDependente);
                    this.processo.processar();
                    break;
                case 4:
                    this.processo = new AtualizarEndereco(clienteDependente);
                    this.processo.processar();
                    break;
                case 5:
                    this.processo = new AtualizarDocumento(clienteDependente);
                    this.processo.processar();
                    break;
                case 6:
                    this.processo = new AtualizarTelefone(clienteDependente);
                    this.processo.processar();
                    break;
                case 7:
                    this.processo = new CadastrarDocumentos(clienteDependente);
                    this.processo.processar();
                    break;
                case 8:
                    this.processo = new CadastrarTelefone(clienteDependente);
                    this.processo.processar();
                    break;
                case 9:
                    this.processo = new DeletarDocumento(clienteDependente);
                    this.processo.processar();
                    break;
                case 10:
                    this.processo = new DeletarTelefone(clienteDependente);
                    this.processo.processar();
                    break;
                case 0:
                    execucao = false;
                    console.log("Dependente atualizado com sucesso!");
                    break;
                default:
                    console.log("Opção não entendida. Tente novamente.");
            }
        }
    }
}
