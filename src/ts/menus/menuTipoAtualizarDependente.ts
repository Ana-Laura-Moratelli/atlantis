import Menu from "../interfaces/menu";

export default class MenuAtualizarDependente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Selecione o que deseja editar: `)
        console.log(`----------------------`)
        console.log(`| 1 - Nome`)
        console.log(`| 2 - Nome Social`)
        console.log(`| 3 - Data de Nascimento`)
        console.log(`| 4 - Endereço`)
        console.log(`| 5 - Documentos`)
        console.log(`| 6 - Telefones`)
        console.log(`| 7 - Adicionar documentos`)
        console.log(`| 8 - Adicionar telefones`)
        console.log(`| 9 - Remover documentos`)
        console.log(`| 10 - Remover telefones`)
        console.log(`****************************`)
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}