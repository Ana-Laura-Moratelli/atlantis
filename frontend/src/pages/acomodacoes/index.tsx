import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/navbar';
import Acomodacao from '../../types/acomodacoes';

function Acomodacoes() {
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);

    useEffect(() => {
        const fetchAcomodacoes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/listar-acomodacoes');
                setAcomodacoes(response.data);
            } catch (error) {
                console.error('Erro ao buscar acomodações:', error);
            }
        };

        fetchAcomodacoes();
    }, []);

    return (
        <>
            <NavBar />
            <h1 className="text-center text-3xl font-bold mt-4">Acomodações</h1>
            <div className="p-4">
                <div className="w-full bg-white shadow-lg rounded-lg">
                    <ul className="list-none">
                        {acomodacoes.map((acomodacao, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                            >
                                <div className="flex flex-col text-center">
                                    <span>{acomodacao.nome}</span>
                                </div>
                                <div className="flex flex-col text-center">
                                    <span>Leitos para solteiros: {acomodacao.leitosSolteiro}</span>
                                    <span>Leitos para casais: {acomodacao.leitosCasal}</span>
                                    <span>Climatização: {acomodacao.climatizacao}</span>
                                    <span>Garagens: {acomodacao.garagens}</span>
                                    <span>Suítes: {acomodacao.suites}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Acomodacoes;
