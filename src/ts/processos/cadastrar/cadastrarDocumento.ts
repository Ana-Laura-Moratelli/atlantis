import Processo from "../../abstracoes/processo";
import MenuTipoDocumento from "../../menus/menuTipoDocumento";
import Cliente from "../../modelos/cliente";
import CadastrarCpf from "./cadastrarCpf";
import CadastrarRg from "./cadastrarRg";
import CadastrarPassaporte from "./cadastrarPassaporte";
export default class CadastrarDocumentos extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuTipoDocumento()
        this.execucao = true
    }

    processar(): void {
        console.log('Cadastro de documento')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.processo = new CadastrarCpf(this.cliente);
                    this.processo.processar();
                    break;
                  case 2:
                    this.processo = new CadastrarRg(this.cliente);
                    this.processo.processar();
                    break;
                  case 3:
                    this.processo = new CadastrarPassaporte(this.cliente);
                    this.processo.processar();
                    break;
                  case 0:
                    this.execucao = false;
                    console.log("Cadastro de documento finalizado.");
                    break;
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}