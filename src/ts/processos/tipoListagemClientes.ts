import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListagemTitulares from "./listagem/listagemTitulares";
import ListagemDependentes from "./listagem/listagemDependentes";
import ListagemDependenteTitular from "./listagem/listagemDependenteTitular";
import ListagemTitularDependente from "./listagem/listagemTitularDependente";

export default class TipoListagemClientes extends Processo {
    constructor(){
        super()
        this.menu = new MenuTipoListagemClientes()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Selecione a opção desejada:')
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares()
                this.processo.processar()
                break;
            case 2:
                this.processo = new ListagemDependentes()
                this.processo.processar()
                break;
            case 3:
                this.processo = new ListagemDependenteTitular()
                this.processo.processar()
                break;
            case 4:
                this.processo = new ListagemTitularDependente()
                this.processo.processar()
                break;
            default:
                console.log('Opção não entendida... :(')
        }
    }
}