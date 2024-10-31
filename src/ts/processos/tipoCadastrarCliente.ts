import Processo from "../abstracoes/processo";
import MenuTipoCadastrarCliente from "../menus/menuTipoCadastrarCliente";
import CadastrarTitular from "./cadastrar/cadastrarTitular";
import CadastrarDependente from "./cadastrar/cadastrarDependente";

export default class TipoCadastrarCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoCadastrarCliente()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Selecione a opção desejada:')

        switch (this.opcao) {
            case 1:
                this.processo = new CadastrarTitular()
                this.processo.processar()
                break
            case 2:
                this.processo = new CadastrarDependente()
                this.processo.processar()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}