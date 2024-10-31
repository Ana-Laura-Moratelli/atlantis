import Menu from "../interfaces/menu";

export default class MenuTipoDocumento implements Menu {
    mostrar(): void {
        console.log(`****************************`)
        console.log(`| Selecione o que tipo de documento: `)
        console.log(`----------------------`)
        console.log(`| 1 - Cadastro de Pessoas Física`)
        console.log(`| 2 - Registro Geral`)
        console.log(`| 3 - Passaporte`)
        console.log(`****************************`)
        console.log(`| 0 - Finalizar cadastro de documentos`)
        console.log(`----------------------`)
    }
}