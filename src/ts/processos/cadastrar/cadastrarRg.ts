import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import { validarData } from "../../utils/validacaoData"; 

export default class CadastrarRg extends Processo {
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
            numero = this.entrada.receberTexto('Número do documento (somente números, 9 dígitos):');
            
            const rgValido = /^[0-9]{9}$/.test(numero);

            if (!rgValido) {
                console.log('RG inválido. O RG deve conter exatamente 9 dígitos numéricos.');
            } else {
                break;
            }
        }

        const rgExistente = this.clientes.some(cliente =>
            cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.RG && doc.Numero === numero) ||
            cliente.Dependentes.some(dependente =>
                dependente.Documentos.some(doc => doc.Tipo === TipoDocumento.RG && doc.Numero === numero)
            )
        );

        if (rgExistente) {
            console.log('RG já cadastrado. Não é possível cadastrar um RG duplicado.');
        } else {
            let dataExpedicao: Date | null;
            while (true) {
                const entradaData = this.entrada.receberTexto('Data de expedição (formato DD/MM/AAAA):');
                dataExpedicao = validarData(entradaData);

                if (dataExpedicao === null) {
                    console.log('Data inválida. Insira uma data no formato DD/MM/AAAA.');
                } else {
                    break;
                }
            }

            if (dataExpedicao) {
                let rg = new Documento(numero, TipoDocumento.RG, dataExpedicao);
                this.cliente.Documentos.push(rg);
                console.log('RG cadastrado com sucesso.');
            }
        }
    }
}
