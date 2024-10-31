import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";

export default class AtualizarNome extends Processo {

  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
  }

  processar() {
    let nomeAtualizado= this.entrada.receberTexto("Digite o nome atualizado: ");
    this.cliente.Nome = nomeAtualizado;
  }

}