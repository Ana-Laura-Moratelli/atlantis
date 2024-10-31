import Processo from "../../abstracoes/processo";
import ImpressorEndereco from "../../impressores/impressorEndereco";
import Cliente from "../../modelos/cliente";

export default class AtualizarEndereco extends Processo {
  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
  }

  processar(): void {
    console.clear();
    console.log("Endereço atual:");
    const impressor = new ImpressorEndereco(this.cliente.Endereco);
    console.log(impressor.imprimir());

    let execucao = true;

    while (execucao) {
      console.log("Escolha a informação que deseja atualizar:");
      console.log("1 - Atualizar Rua");
      console.log("2 - Atualizar Bairro");
      console.log("3 - Atualizar Cidade");
      console.log("4 - Atualizar Estado");
      console.log("5 - Atualizar País");
      console.log("6 - Atualizar Código Postal");
      console.log("0 - Sair");

      let opcao = this.entrada.receberNumero("Digite o número da opção:");

      switch (opcao) {
        case 1:
          let novaRua = this.entrada.receberTexto("Nova Rua:");
          this.cliente.Endereco.Rua = novaRua; 
          console.log("Rua atualizada com sucesso!");
          break;

        case 2:
          let novoBairro = this.entrada.receberTexto("Novo Bairro:");
          this.cliente.Endereco.Bairro = novoBairro;
          console.log("Bairro atualizado com sucesso!");
          break;

        case 3:
          let novaCidade = this.entrada.receberTexto("Nova Cidade:");
          this.cliente.Endereco.Cidade = novaCidade; 
          console.log("Cidade atualizada com sucesso!");
          break;

        case 4:
          let novoEstado = this.entrada.receberTexto("Novo Estado:");
          this.cliente.Endereco.Estado = novoEstado; 
          console.log("Estado atualizado com sucesso!");
          break;

        case 5:
          let novoPais = this.entrada.receberTexto("Novo País:");
          this.cliente.Endereco.Pais = novoPais; 
          console.log("País atualizado com sucesso!");
          break;

        case 6:
          let novoCodigoPostal: string;
          while (true) {
              novoCodigoPostal = this.entrada.receberTexto("Novo Código Postal (formato 99999-999):");

              const codigoPostalValido = /^[0-9]{5}-[0-9]{3}$/.test(novoCodigoPostal);

              if (!codigoPostalValido) {
                  console.log("Código postal inválido. O código postal deve estar no formato 99999-999.");
              } else {
                  this.cliente.Endereco.CodigoPostal = novoCodigoPostal; 
                  console.log("Código Postal atualizado com sucesso!");
                  break;
              }
          }
          break;

        case 0:
          execucao = false;
          console.log("Endereço atualizado com sucesso!");
          break;

        default:
          console.log("Opção não entendida. Tente novamente.");
      }
    }
  }
}
