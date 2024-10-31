import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";

export default class CadastrarTelefone extends Processo {
  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
  }

  processar(): void {
    console.log('Cadastro de Telefone');

    let ddd: string;
    while (true) {
      ddd = this.entrada.receberTexto('DDD (somente 2 dígitos):');
      const dddValido = /^[0-9]{2}$/.test(ddd); 

      if (!dddValido) {
        console.log('DDD inválido. Insira exatamente 2 dígitos.');
      } else {
        break; 
      }
    }

    let numero: string;
    while (true) {
      numero = this.entrada.receberTexto('Número do telefone (formato 9999-9999 ou 99999-9999):');
      const numeroValido = /^[0-9]{4,5}-[0-9]{4}$/.test(numero); 

      if (!numeroValido) {
        console.log('Número de telefone inválido. Use o formato 9999-9999 ou 99999-9999.');
      } else {
        break; 
      }
    }

    let telefone = new Telefone(ddd, numero);
    this.cliente.Telefones.push(telefone);

    console.log('Telefone cadastrado com sucesso!');
  }
}