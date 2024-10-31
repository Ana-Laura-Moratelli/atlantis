import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import MenuEditarClienteTitular from "../../menus/menuTipoAtualizarTitular";
import Cliente from "../../modelos/cliente";
import CadastrarDocumento from "../cadastrar/cadastrarDocumento";
import CadastrarTelefone from "../cadastrar/cadastrarTelefone";
import DeletarDocumento from "../deletar/deletarDocumento";
import DeletarTelefone from "../deletar/deletarTelefone";
import AtualizarDataNascimento from "./atualizarDataNascimento";
import AtualizarDocumento from "./atualizarDocumento";
import AtualizarEndereco from "./atualizarEndereco";
import AtualizarNome from "./atualizarNome";
import AtualizarNomeSocial from "./atualizarNomeSocial";
import AtualizarTelefone from "./atualizarTelefone";

export default class AtualizarTitular extends Processo {
  private clientes: Cliente[];

  constructor() {
    super();
    this.menu = new MenuEditarClienteTitular();
    this.clientes = Armazem.InstanciaUnica.Clientes;
  }

  processar(): void {

    if (this.clientes.length === 0) {
      console.log("Não há titulares cadastrados.");
      return;
    }

    console.log("Lista de titulares disponíveis:");
    this.clientes.forEach((cliente, index) => {
      console.log(`${index + 1} - Titular: ${cliente.Nome}`);
    });

    let indiceTitular = this.entrada.receberNumero("Escolha o número do titular para editar:");

    if (indiceTitular < 1 || indiceTitular > this.clientes.length) {
      console.log("Índice inválido. Tente novamente.");
      return;
    }

    let clienteTitular = this.clientes[indiceTitular - 1];

    let execucao = true;

    while (execucao) {
      this.menu.mostrar();
      let opcao = this.entrada.receberNumero("Escolha uma opção:");

      switch (opcao) {
        case 1:
          this.processo = new AtualizarNome(clienteTitular);
          this.processo.processar();
          break;
        case 2:
          this.processo = new AtualizarNomeSocial(clienteTitular);
          this.processo.processar();
          break;
        case 3:
          this.processo = new AtualizarDataNascimento(clienteTitular);
          this.processo.processar();
          break;
        case 4:
          this.processo = new AtualizarEndereco(clienteTitular);
          this.processo.processar();
          break;
        case 5:
          this.processo = new AtualizarDocumento(clienteTitular);
          this.processo.processar();
          break;
        case 6:
          this.processo = new AtualizarTelefone(clienteTitular);
          this.processo.processar();
          break;
        case 7:
          this.processo = new CadastrarDocumento(clienteTitular);
          this.processo.processar();
          break;
        case 8:
          this.processo = new CadastrarTelefone(clienteTitular);
          this.processo.processar();
          break;
        case 9:
          this.processo = new DeletarDocumento(clienteTitular);
          this.processo.processar();
          break;
        case 10:
          this.processo = new DeletarTelefone(clienteTitular);
          this.processo.processar();
          break;
        case 0:
          execucao = false;
          console.log("Titular atualizado com sucesso!");
          break;
        default:
          console.log("Opção não entendida. Tente novamente.");
      }
    }
  }
}
