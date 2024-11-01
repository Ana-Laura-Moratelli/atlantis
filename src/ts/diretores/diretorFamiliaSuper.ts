import Diretor from "../abstracoes/diretor"
import ConstrutorAcomodacao from "../construtores/construtorAcomodacao"
import { NomeAcomadacao } from "../enumeracoes/NomeAcomodacao"
import Acomodacao from "../modelos/acomodacao"

export default class DiretorFamiliaSuper extends Diretor<Acomodacao> {
        
        constructor() {
            super()
            this.construtor = new ConstrutorAcomodacao()
        }
        
        public construir(): Acomodacao {
            let objetoConstrutor = this.construtor as ConstrutorAcomodacao
            objetoConstrutor.NomeAcomodacao = NomeAcomadacao.FamiliaSuper
            objetoConstrutor.CamaCasal = 2
            objetoConstrutor.CamaSolteiro = 6
            objetoConstrutor.Climatizacao = true
            objetoConstrutor.Garagem = 2
            objetoConstrutor.Suite = 3
            return objetoConstrutor.construir()
        }
    }