import Menu from "../interfaces/menu";

export default class MenuTipoListagemClientes implements Menu {
    mostrar(): void {
        console.log(`****************************`)
        console.log(`| Selecione a listagem desejada: `)
        console.log(`----------------------`)
        console.log(`| 1 - Todos os titulares`)
        console.log(`| 2 - Todos os dependentes`)
        console.log(`| 3 - Titular de um dependente específico`)
        console.log(`| 4 - Dependentes de um titular específico`)
        console.log(`----------------------`)
    }
}