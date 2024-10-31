import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";

export default class DeletarTitular extends Processo {
  private clientes: Cliente[];

  constructor() {
    super();
    this.clientes = Armazem.InstanciaUnica.Clientes;
    this.execucao = true;
  }

  processar(): void {
    if (this.clientes.length === 0) {
      console.log("Não há clientes cadastrados.");
      return;
    }

    console.log('1 - Listar todos os titulares');
    console.log('2 - Buscar por CPF do titular');
    const opcao = this.entrada.receberNumero("Escolha uma opção: ");

    let clienteEncontrado: Cliente | null = null;

    switch (opcao) {
      case 1:
        clienteEncontrado = this.selecionarTitularPorIndice();
        break;
      case 2:
        clienteEncontrado = this.selecionarTitularPorCPF();
        break;
      default:
        console.log("Opção inválida. Operação cancelada.");
        return;
    }

    if (!clienteEncontrado) {
      console.log("Titular não encontrado.");
      return;
    }

    const quantidadeDependentes = clienteEncontrado.Dependentes.length;

    const confirmacao = this.entrada.receberTexto(
      `Você deseja mesmo deletar o titular ${clienteEncontrado.Nome} e seus ${quantidadeDependentes} dependentes? (s/n):`
    );

    if (confirmacao.toLowerCase() === "s") {
      this.deletarClienteETodosOsDependentes(clienteEncontrado);
      console.log(`Titular ${clienteEncontrado.Nome} e seus dependentes foram excluídos com sucesso!`);
    } else {
      console.log("Operação cancelada.");
    }
  }

  private selecionarTitularPorIndice(): Cliente | null {
    this.listarTitulares();
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
    const cliente = this.clientes.find(cliente =>
      cliente.Documentos.some(doc => doc.Numero === cpfTitular && doc.Tipo === TipoDocumento.CPF)
    );

    return cliente || null;
  }

  private listarTitulares(): void {
    console.log("Lista de Titulares:");
    this.clientes.forEach((cliente, index) => {
      console.log(`${index + 1} - ${cliente.Nome}`); 
    });
  }

  private deletarClienteETodosOsDependentes(cliente: Cliente): void {
    cliente.Dependentes.forEach(dependente => {
      const indexDependente = this.clientes.indexOf(dependente);
      if (indexDependente > -1) {
        this.clientes.splice(indexDependente, 1);
      }
    });

    const index = this.clientes.indexOf(cliente);
    if (index > -1) {
      this.clientes.splice(index, 1);
    }
  }
}
