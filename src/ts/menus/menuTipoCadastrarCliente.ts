import Menu from "../interfaces/menu";

export default class MenuTipoCadastrarCliente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Selecione o que tipo de cliente que deseja cadastrar: `)
        console.log(`----------------------`)
        console.log(`| 1 - Titular`)
        console.log(`| 2 - Dependente`)
        console.log(`----------------------`)
    }
}