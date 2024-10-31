import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import CadastrarEndereco from "./cadastrarEndereco";
import CadastrarTelefone from "./cadastrarTelefone";
import CadastrarDocumentos from "./cadastrarDocumento";
import { validarData } from "../../utils/validacaoData"; 

export default class CadastrarTitular extends Processo {
    processar(): void {
        console.log('Cadastro Titular:');
        let nome = this.entrada.receberTexto('Nome:');
        let nomeSocial = this.entrada.receberTexto('Nome social:');

        let dataNascimento: Date | null;
        while (true) {
            const entradaDataNascimento = this.entrada.receberTexto('Data de nascimento (formato: DD/MM/AAAA):');
            dataNascimento = validarData(entradaDataNascimento);

            if (dataNascimento === null) {
                console.log('Data de nascimento inválida. Insira uma data no formato DD/MM/AAAA.');
            } else {
                break;
            }
        }

        const cliente = new Cliente(nome, nomeSocial, dataNascimento);

        this.processo = new CadastrarEndereco(cliente);
        this.processo.processar();

        this.processo = new CadastrarTelefone(cliente);
        this.processo.processar();

        this.processo = new CadastrarDocumentos(cliente);
        this.processo.processar();

        const armazem = Armazem.InstanciaUnica;
        armazem.Clientes.push(cliente);

        console.log('Cadastro realizado com sucesso.');
    }
}
