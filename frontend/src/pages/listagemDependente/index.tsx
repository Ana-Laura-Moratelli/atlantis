import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar';

interface Dependente {
    id: number;
    nome: string;
    titular: string;
}

function ListagemDependente() {
    const [dependentes, setDependentes] = useState<Dependente[]>([
        { id: 1, nome: 'João', titular: 'Ana' },
        { id: 2, nome: 'Maria', titular: 'João' },
    ]);

    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        setDependentes(dependentes.filter(dependente => dependente.id !== id));
    };

    const handleEdit = (id: number) => {
        navigate(`/atualizarDependente/${id}`);
    };

    return (
        <>
            <NavBar />
            <h1 className="text-center text-3xl font-bold mt-4">Dependentes Cadastrados</h1>
            <div className="p-4">
                <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                >
                    <option selected>Selecione o titular</option>
                    <option>Ana</option>
                    <option>João</option>
                </select>
                <div className="w-full bg-white shadow-lg rounded-lg">
                    <ul className="list-none">
                        {dependentes.map(dependente => (
                            <li
                                key={dependente.id}
                                className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span>{dependente.nome}</span>
                                    <span>Titular: {dependente.titular}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(dependente.id)}
                                        className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1 text-center"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(dependente.id)}
                                        className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-3 py-1 text-center"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ListagemDependente;
