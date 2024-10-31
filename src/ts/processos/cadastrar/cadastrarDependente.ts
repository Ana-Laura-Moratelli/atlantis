import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import CadastrarEndereco from "./cadastrarEndereco";
import CadastrarTelefone from "./cadastrarTelefone";
import CadastrarDocumento from "./cadastrarDocumento";
import { validarData } from "../../utils/validacaoData"; 

export default class CadastrarDependente extends Processo {
    private clientes: Cliente[];

    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        if (this.clientes.length === 0) {
            console.log("Nenhum titular cadastrado.");
            return;
        }

        console.log('1 - Listar todos os titulares');
        console.log('2 - Buscar por CPF do titular');

        const opcao = this.entrada.receberTexto("Escolha uma opção: ").trim();

        let clienteTitular: Cliente | undefined;

        if (opcao === '1') {
            console.log("Lista dos titulares");
            this.clientes.forEach((cliente, index) => {
                console.log(`${index + 1} - ${cliente.Nome}`);
            });

            const indiceCliente = parseInt(this.entrada.receberTexto("Selecione o número do titular para cadastrar o dependente: ").trim());

            if (indiceCliente > 0 && indiceCliente <= this.clientes.length) {
                clienteTitular = this.clientes[indiceCliente - 1];
            } else {
                console.log("Número de cliente inválido.");
                return;
            }
        } else if (opcao === '2') {
            const cpfTitular = this.entrada.receberTexto("CPF do titular:");

            clienteTitular = this.clientes.find(cliente =>
                cliente.Documentos.some(dadosCPF =>
                    dadosCPF.Numero === cpfTitular && dadosCPF.Tipo === TipoDocumento.CPF
                )
            );

            if (!clienteTitular) {
                console.log("Titular não encontrado :(");
                return;
            }
        } else {
            console.log("Opção inválida. Tente novamente.");
            return;
        }

        this.execucao = true;

        while (this.execucao) {
            console.log("Cadastro dependente");

            const nome = this.entrada.receberTexto("Nome:");
            const nomeSocial = this.entrada.receberTexto("Nome social:");
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

            const clienteDependente = new Cliente(nome, nomeSocial, dataNascimento);
            clienteTitular.Dependentes.push(clienteDependente);

            this.processo = new CadastrarEndereco(clienteDependente);
            this.processo.processar();

            this.processo = new CadastrarTelefone(clienteDependente);
            this.processo.processar();

            this.processo = new CadastrarDocumento(clienteDependente);
            this.processo.processar();

            const cadastrarOutro = this.entrada.receberTexto("Deseja cadastrar outro dependente? (S/N)").trim().toLowerCase();
            if (cadastrarOutro !== 's') {
                this.execucao = false;
            }
        }

        console.log("Cadastro de dependente finalizado");
    }
}
