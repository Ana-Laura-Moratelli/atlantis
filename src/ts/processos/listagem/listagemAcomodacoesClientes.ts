import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorAcomodacao from "../../impressores/impressorAcomodacao";

export default class ListagemAcomodacoesClientes extends Processo {
  constructor() {
    super();
  }

  processar(): void {
    console.clear();
    console.log("Listagem de Acomodações Cadastradas por Clientes:");
    console.log(`-------------------------------------------------`);

    const clientes = Armazem.InstanciaUnica.Clientes;
    let acomodacaoEncontrada = false;

    clientes.forEach((cliente) => {
        
      if (cliente.Acomodacao) {
        acomodacaoEncontrada = true;
        console.log(`Cliente Titular: ${cliente.Nome}`);
        const impressorAcomodacao = new ImpressorAcomodacao(cliente.Acomodacao);
        console.log(impressorAcomodacao.imprimir());
        console.log(`-------------------------------------------------`);
      }

      cliente.Dependentes.forEach((dependente) => {
        if (dependente.Acomodacao) {
          acomodacaoEncontrada = true;
          console.log(`Dependente: ${dependente.Nome} (Titular: ${cliente.Nome})`);
          const impressorAcomodacao = new ImpressorAcomodacao(dependente.Acomodacao);
          console.log(impressorAcomodacao.imprimir());
          console.log(`-------------------------------------------------`);
        }
      });
    });

    if (!acomodacaoEncontrada) {
      console.log("Nenhuma acomodação cadastrada para usuários ou dependentes.");
    }
  }
}
