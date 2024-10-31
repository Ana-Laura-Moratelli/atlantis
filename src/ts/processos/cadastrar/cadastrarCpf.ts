import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import { validarData } from "../../utils/validacaoData";

export default class CadastrarCpf extends Processo {
    private cliente: Cliente;
    private clientes: Cliente[];

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        let numero: string;

        while (true) {
            numero = this.entrada.receberTexto('Número do documento (somente números, 11 dígitos):');
            const cpfValido = /^[0-9]{11}$/.test(numero);

            if (!cpfValido) {
                console.log('CPF inválido. O CPF deve conter exatamente 11 dígitos numéricos.');
            } else {
                break;
            }
        }

        const cpfExistente = this.clientes.some(cliente =>
            cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === numero) ||
            cliente.Dependentes.some(dependente =>
                dependente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === numero)
            )
        );

        if (cpfExistente) {
            console.log('CPF já cadastrado. Não é possível cadastrar um CPF duplicado.');
        } else {
            let dataExpedicao: Date | null;
            while (true) {
                const entradaData = this.entrada.receberTexto('Data de expedição (formato: DD/MM/AAAA):');
                dataExpedicao = validarData(entradaData);

                if (dataExpedicao === null) {
                    console.log('Data inválida. Insira uma data no formato DD/MM/AAAA.');
                } else {
                    break;
                }
            }

            if (dataExpedicao) {
                let cpf = new Documento(numero, TipoDocumento.CPF, dataExpedicao);
                this.cliente.Documentos.push(cpf);
                console.log('CPF cadastrado com sucesso.');
            }
        }
    }
}
