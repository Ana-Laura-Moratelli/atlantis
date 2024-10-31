import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";

export default class AtualizarTelefone extends Processo {
  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
  }

  processar() {
    if (this.cliente.Telefones.length === 0) {
      console.log("Não há telefones cadastrados.");
      return;
    }

    console.log("Telefones cadastrados:");
    this.cliente.Telefones.forEach((telefone, index) => {
      console.log(`${index + 1} - (${telefone.Ddd}) ${telefone.Numero}`);
    });

    const indice = this.entrada.receberNumero("Digite o número do índice do telefone que deseja editar: ") - 1;

    if (indice >= 0 && indice < this.cliente.Telefones.length) {
      let novoDdd: string;
      while (true) {
        novoDdd = this.entrada.receberTexto("Digite o novo DDD (somente 2 dígitos): ");
        const dddValido = /^[0-9]{2}$/.test(novoDdd);

        if (!dddValido) {
          console.log("DDD inválido. Insira exatamente 2 dígitos.");
        } else {
          break;
        }
      }

      let novoNumero: string;
      while (true) {
        novoNumero = this.entrada.receberTexto("Digite o novo número (formato 9999-9999 ou 99999-9999): ");
        const numeroValido = /^[0-9]{4,5}-[0-9]{4}$/.test(novoNumero);

        if (!numeroValido) {
          console.log("Número de telefone inválido. Use o formato 9999-9999 ou 99999-9999.");
        } else {
          break;
        }
      }

      this.cliente.Telefones[indice].Ddd = novoDdd;
      this.cliente.Telefones[indice].Numero = novoNumero;

      console.log("Telefone atualizado com sucesso!");
    } else {
      console.log("Índice inválido. Por favor, tente novamente.");
    }
  }
}
