import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";

export default class CadastrarEndereco extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log('Endereço');
        let rua = this.entrada.receberTexto('Rua:');
        let bairro = this.entrada.receberTexto('Bairro:');
        let cidade = this.entrada.receberTexto('Cidade:');
        let estado = this.entrada.receberTexto('Estado:');
        let pais = this.entrada.receberTexto('País:');
        let codigoPostal: string;

        while (true) {
            codigoPostal = this.entrada.receberTexto('Código postal (formato 99999-999):');

            const codigoPostalValido = /^[0-9]{5}-[0-9]{3}$/.test(codigoPostal);

            if (!codigoPostalValido) {
                console.log('Código postal inválido. O código postal deve estar no formato 99999-999.');
            } else {
                break; 
            }
        }

        let endereco = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal);
        this.cliente.Endereco = endereco;

        console.log('Endereço cadastrado com sucesso.');
    }
}