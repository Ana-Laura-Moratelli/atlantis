import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemDependentes extends Processo {
    private clientes: Cliente[];
    private impressor!: Impressor;

    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        
        if (this.clientes.length === 0) {
            console.log("Não há titulares cadastrados.");
            return;
        }

        console.log('Listagem dos clientes dependentes');
        
        this.clientes.forEach(cliente => {
            if (cliente.Dependentes.length === 0) {
                console.log(`O titular ${cliente.Nome} não possui dependentes cadastrados.`);
            } else {
                console.log(`Titular: ${cliente.Nome}`);
                cliente.Dependentes.forEach(dependente => {
                    this.impressor = new ImpressorCliente(dependente);
                    console.log(this.impressor.imprimir());
                });
                console.log('----------------------'); 
            }
        });
    }
}
