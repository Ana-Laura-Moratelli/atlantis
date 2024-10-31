import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";

export default class DeletarTelefone extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.execucao = true;
    }

    processar(): void {
        console.clear();
        console.log('Excluir telefone do cliente')
        console.log(`Telefones cadastrados:`);

        this.cliente.Telefones.forEach((telefone, index) => {
            console.log(`${index + 1} - (${telefone.Ddd}) ${telefone.Numero}`);
        });

        const indexTelefone = this.entrada.receberNumero('Informe o índice do telefone que deseja excluir:') - 1;

        if (indexTelefone < 0 || indexTelefone >= this.cliente.Telefones.length) {
            console.log('Telefone não encontrado.');
            return;
        }

        this.cliente.Telefones.splice(indexTelefone, 1);
        console.log('Telefone excluído com sucesso!');
    }
}