import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar';

interface Titular {
    id: number;
    nome: string;
}

function ListagemTitular() {
    const [titulares, setTitulares] = useState<Titular[]>([
        { id: 1, nome: 'Ana' },
        { id: 2, nome: 'João' },
        { id: 3, nome: 'Lucas' },
    ]);

    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        setTitulares(titulares.filter(titular => titular.id !== id));
    };

    const handleEdit = (id: number) => {
        navigate(`/atualizarTitular/${id}`);
    };

    return (
        <>
            <NavBar />
            <h1 className="text-center text-3xl font-bold mt-4">Titulares Cadastrados</h1>
            <div className="p-4">
                <div className="w-full bg-white shadow-lg rounded-lg">
                    <ul className="list-none">
                        {titulares.map((titular) => (
                            <li key={titular.id} className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                                <span>{titular.nome}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(titular.id)}
                                        className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1 text-center"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(titular.id)}
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

export default ListagemTitular;
