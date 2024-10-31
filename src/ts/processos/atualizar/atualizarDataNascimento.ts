import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";
import { validarData } from "../../utils/validacaoData"; 

export default class AtualizarDataNascimento extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar() {
        let dataNascimentoAtualizada: Date | null;

        while (true) {
            const entradaData = this.entrada.receberTexto("Digite a data de nascimento atualizada (formato DD/MM/AAAA): ");
            dataNascimentoAtualizada = validarData(entradaData);

            if (dataNascimentoAtualizada === null) {
                console.log("Data de nascimento inválida. Insira uma data no formato DD/MM/AAAA.");
            } else {
                break;
            }
        }

        if (dataNascimentoAtualizada) {
            this.cliente.DataNascimento = dataNascimentoAtualizada;
            console.log("Data de nascimento atualizada com sucesso.");
        }
    }
}
