import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import MenuTipoCadastroAcomodacao from "../../menus/menuTipoCadastrarAcomodacao";
import Acomodacao from "../../modelos/acomodacao";
import Cliente from "../../modelos/cliente";

export default class CadastrarAcomodacaoCliente extends Processo {
  private acomodacoes: Acomodacao[];

  constructor() {
    super();
    this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes;
    this.menu = new MenuTipoCadastroAcomodacao();
  }

  processar(): void {

    const clientes = Armazem.InstanciaUnica.Clientes;
    const todosClientes: { cliente: Cliente; nome: string }[] = [];

    clientes.forEach((cliente) => {
      todosClientes.push({ cliente, nome: cliente.Nome }); 
      cliente.Dependentes.forEach((dependente) => {
        todosClientes.push({ cliente: dependente, nome: `${dependente.Nome} (Dependente de ${cliente.Nome})` }); 
      });
    });

    if (todosClientes.length === 0) {
      console.log("Nenhum cliente ou dependente cadastrado.");
      return;
    }

    console.log("Selecione o cliente ou dependente para quem deseja cadastrar a acomodação:");
    todosClientes.forEach((item, index) => {
      console.log(`${index + 1} - ${item.nome}`);
    });

    const indiceCliente = this.entrada.receberNumero("Digite o número do cliente ou dependente: ") - 1;
    const clienteAcomodacao = todosClientes[indiceCliente]?.cliente;

    if (!clienteAcomodacao) {
      console.log("Cliente inválido.");
      return;
    }

    this.menu.mostrar();
    const entrada = this.entrada.receberNumero("Digite o número da acomodação: ");
    const acomodacaoSelecionada = this.acomodacoes[entrada - 1];

    if (acomodacaoSelecionada) {
      const acomodacao = new Acomodacao(
        acomodacaoSelecionada.NomeAcomadacao,
        acomodacaoSelecionada.CamaSolteiro,
        acomodacaoSelecionada.CamaCasal,
        acomodacaoSelecionada.Suite,
        acomodacaoSelecionada.Climatizacao,
        acomodacaoSelecionada.Garagem
      );
      clienteAcomodacao.Acomodacao = acomodacao;
      console.log("Acomodação cadastrada com sucesso!");
    } else {
      console.log("Número de acomodação inválido.");
    }
  }
}
