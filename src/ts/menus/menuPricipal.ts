import Menu from "../interfaces/menu";

export default class MenuPrincipal implements Menu {
    mostrar(): void {
        console.log(`****************************`)
        console.log(`| Selecione uma opção:`)
        console.log(`----------------------`)
        console.log(`| 1 - Cadastrar cliente`)
        console.log(`| 2 - Atualizar cliente`)
        console.log(`| 3 - Listar cliente(s)`)
        console.log(`| 4 - Deletar cliente`)
        console.log(`----------------------`)
        console.log(`| Opções para gestão:`)
        console.log(`----------------------`)
        console.log(`| 5 - Listar acomodações`)
        console.log(`| 6 - Fazer reserva`)
        console.log(`| 7 - Listar reservas`)
        console.log(`| 8 - Deletar reserva`)
        console.log(`----------------------`)
        console.log(`****************************`)
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}