import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";

export default class DeletarDependente extends Processo {
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

    this.listarDependentes(clienteTitular);

    if (clienteTitular.Dependentes.length === 0) {
      console.log("O titular selecionado não possui dependentes cadastrados.");
      return;
    }

    const indiceDependente = this.entrada.receberNumero("Digite o número do dependente a ser excluído (ou 0 para cancelar):");

    if (indiceDependente === 0) {
      console.log("Operação cancelada.");
      return;
    }

    if (indiceDependente < 1 || indiceDependente > clienteTitular.Dependentes.length) {
      console.log("Índice de dependente inválido. Tente novamente.");
      return;
    }

    const dependenteEncontrado = clienteTitular.Dependentes[indiceDependente - 1];

    const confirmacao = this.entrada.receberTexto(`Você deseja mesmo deletar o dependente ${dependenteEncontrado.Nome}? (S/N):`);
    if (confirmacao.toLowerCase() === "s") {
      this.deletarDependente(clienteTitular, dependenteEncontrado);
      console.log(`Dependente ${dependenteEncontrado.Nome} excluído com sucesso!`);
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

  private listarDependentes(titular: Cliente): void {
    console.log(`Lista de Dependentes de ${titular.Nome}:`);
    titular.Dependentes.forEach((dependente, index) => {
      console.log(`${index + 1} - ${dependente.Nome}`);
    });
  }

  private deletarDependente(titular: Cliente, dependente: Cliente): void {
    const indexDependente = titular.Dependentes.indexOf(dependente);
    if (indexDependente > -1) {
      titular.Dependentes.splice(indexDependente, 1);
    }

    const indexGlobal = this.clientes.indexOf(dependente);
    if (indexGlobal > -1) {
      this.clientes.splice(indexGlobal, 1);
    }
  }
}
