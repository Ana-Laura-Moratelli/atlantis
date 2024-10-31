import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import { validarData } from "../../utils/validacaoData"; 

export default class CadastrarPassaporte extends Processo {
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
            numero = this.entrada.receberTexto('Número do passaporte (duas letras seguidas de seis dígitos):').toUpperCase(); 

            const passaporteValido = /^[A-Z]{2}[0-9]{6}$/.test(numero);

            if (!passaporteValido) {
                console.log('Número de passaporte inválido. Deve conter duas letras seguidas de seis dígitos.');
            } else {
                break;
            }
        }

        const passaporteExistente = this.clientes.some(cliente =>
            cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.Passaporte && doc.Numero.toUpperCase() === numero) ||
            cliente.Dependentes.some(dependente =>
                dependente.Documentos.some(doc => doc.Tipo === TipoDocumento.Passaporte && doc.Numero.toUpperCase() === numero)
            )
        );

        if (passaporteExistente) {
            console.log('Passaporte já cadastrado. Não é possível cadastrar um passaporte duplicado.');
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
                let passaporte = new Documento(numero, TipoDocumento.Passaporte, dataExpedicao);
                this.cliente.Documentos.push(passaporte);
                console.log('Passaporte cadastrado com sucesso.');
            }
        }
    }
}
