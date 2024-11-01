import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";

export default class DeletarAcomodacaoCliente extends Processo {
    constructor() {
        super();
    }

    processar(): void {
        const clientes = Armazem.InstanciaUnica.Clientes;

        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.");
            return;
        }

        console.log("Selecione o cliente para deletar a reserva:");
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`);
        });

        const indiceCliente = this.entrada.receberNumero("Digite o número do cliente: ") - 1;
        const clienteSelecionado = clientes[indiceCliente];

        if (!clienteSelecionado) {
            console.log("Cliente inválido.");
            return;
        }

        const pessoasComAcomodacao: { cliente: Cliente; tipo: string }[] = [];

        if (clienteSelecionado.Acomodacao) {
            pessoasComAcomodacao.push({ cliente: clienteSelecionado, tipo: "Titular" });
        }

        clienteSelecionado.Dependentes.forEach((dependente) => {
            if (dependente.Acomodacao) {
                pessoasComAcomodacao.push({ cliente: dependente, tipo: `Dependente de ${clienteSelecionado.Nome}` });
            }
        });

        if (pessoasComAcomodacao.length === 0) {
            console.log("Nenhuma acomodação cadastrada para este cliente ou seus dependentes.");
            return;
        }

        console.log("Escolha a acomodação que deseja deletar:");
        pessoasComAcomodacao.forEach((item, index) => {
            const nomeAcomodacao = item.cliente.Acomodacao?.NomeAcomadacao ?? "Acomodação sem nome";
            console.log(`${index + 1} - ${item.cliente.Nome} (${item.tipo}) - ${nomeAcomodacao}`);
        });


        const indiceAcomodacao = this.entrada.receberNumero("Digite o número da pessoa com acomodação: ") - 1;
        const pessoaSelecionada = pessoasComAcomodacao[indiceAcomodacao]?.cliente;

        if (pessoaSelecionada && pessoaSelecionada.Acomodacao) {
            pessoaSelecionada.Acomodacao = null as any;
            console.log("Acomodação deletada com sucesso!");
        } else {
            console.log("Seleção inválida. Nenhuma acomodação foi deletada.");
        }
    }
}
