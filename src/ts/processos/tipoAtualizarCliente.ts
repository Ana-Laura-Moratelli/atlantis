import Processo from "../abstracoes/processo";
import MenuAtualizarTipoCliente from "../menus/menuTipoAtualizarCliente";
import AtualizarDependente from "./atualizar/atualizarDependente";
import AtualizarTitular from "./atualizar/atualizarTitular";

export default class tipoAtualizarCliente extends Processo {

    constructor() {
        super()
        this.menu = new MenuAtualizarTipoCliente()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero("Selecione a opção desejada:")

        switch (this.opcao) {
            case 1:
                this.processo = new AtualizarTitular()
                this.processo.processar()
                break
            case 2:
                this.processo = new AtualizarDependente()
                this.processo.processar()
                break
            default:
                console.log("Opção não entendida :(")
        }
    }
}