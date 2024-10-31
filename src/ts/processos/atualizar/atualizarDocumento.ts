import Processo from "../../abstracoes/processo";
import MenuTipoDocumento from "../../menus/menuTipoDocumento";
import Cliente from "../../modelos/cliente";
import AtualizarCpf from "./atualizarCpf";
import AtualizarRg from "./atualizarRg";
import AtualizarPassaporte from "./atualizarPassaporte";

export default class AtualizarDocumentos extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.menu = new MenuTipoDocumento();
        this.execucao = true;
    }

    processar(): void {
        console.log("Atualização de documento");
        while (this.execucao) {
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero("Qual opção desejada?");
            switch (this.opcao) {
                case 1:
                    this.processo = new AtualizarCpf(this.cliente);
                    this.processo.processar();
                    break;
                case 2:
                    this.processo = new AtualizarRg(this.cliente);
                    this.processo.processar();
                    break;
                case 3:
                    this.processo = new AtualizarPassaporte(this.cliente);
                    this.processo.processar();
                    break;
                case 0:
                    this.execucao = false;
                    console.log("Atualização de documento finalizada.");
                    break;
                default:
                    console.log("Opção não entendida :(");
            }
        }
    }
}
