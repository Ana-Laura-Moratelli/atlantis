import Processo from "../abstracoes/processo"
import MenuPrincipal from "../menus/menuPricipal"
import TipoCadastroCliente from "./tipoCadastrarCliente"
import TipoAtualizarCliente from "./tipoAtualizarCliente"
import TipoListagemClientes from "./tipoListagemClientes"
import TipoDeletarCliente from "./tipoDeletarCliente"
import ListagemAcomodacoes from "./listagem/listagemAcomodacoes"
import CadastrarAcomodacaoCliente from "./cadastrar/cadastroAcomodacaoCliente"
import ListagemAcomodacoesClientes from "./listagem/listagemAcomodacoesClientes"
import DeletarAcomodacaoCliente from "./deletar/deletarReserva"
export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Selecione a opção desejada:')
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente()
                this.processo.processar()
                break
            case 2:
                this.processo = new TipoAtualizarCliente()
                this.processo.processar()
                break
            case 3:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            case 4:
                this.processo = new TipoDeletarCliente()
                this.processo.processar()
                break
            case 5:
                this.processo = new ListagemAcomodacoes()
                this.processo.processar()
                break
            case 6:
                this.processo = new CadastrarAcomodacaoCliente()
                this.processo.processar()
                break
            case 7:
                this.processo = new ListagemAcomodacoesClientes()
                this.processo.processar()
                break
            case 8:
                this.processo = new DeletarAcomodacaoCliente()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}