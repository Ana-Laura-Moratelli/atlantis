import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";
import ImpressorDocumento from "../../impressores/impressorDocumento";

export default class DeletarDocumento extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.execucao = true;
    }

    processar(): void {
        console.clear();
        console.log('Excluir documento do cliente')
        console.log(`Documentos cadastrados:`)

        this.cliente.Documentos.forEach((documento, index) => {
            const impressor = new ImpressorDocumento(documento);
            console.log(`${index + 1} - ${impressor.imprimir()}`);
        });

        const indexDocumento = this.entrada.receberNumero('Informe o índice do documento que deseja excluir:') - 1;

        if (indexDocumento < 0 || indexDocumento >= this.cliente.Documentos.length) {
            console.log('Documento não encontrado.');
            return;
        }

        this.cliente.Documentos.splice(indexDocumento, 1);
        console.log('Documento excluído com sucesso!');
    }
}