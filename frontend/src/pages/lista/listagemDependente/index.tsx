import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../../components/navbar';
import Modal from '../../../components/modal';
import Swal from 'sweetalert2';
import Cliente from '../../../types/cliente';

function ListagemDependentes() {
    const [dependentes, setDependentes] = useState<Cliente[]>([]);
    const [dependentesDetalhes, setDependenteDetalhes] = useState<Cliente | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchDependentes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/listar-dependentes');
                setDependentes(response.data);
            } catch (error) {
                console.error('Erro ao listar titulares:', error);
            }
        };
        fetchDependentes();
    }, [location]);


    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/excluir-dependente/${id}`);
            setDependentes((prev) => prev.filter((dependente) => dependente.id !== id));
    
            Swal.fire({
                icon: 'success',
                title: 'Excluído com sucesso!',
                text: 'O dependente foi excluído com sucesso.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message;
    
                if (errorMessage === 'Não é possível excluir o dependente com reservas associadas') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Dependente possui reservas',
                        text: 'O dependente não pode ser excluído porque possui reservas associadas.',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Erro ao excluir dependente. Tente novamente.',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro inesperado ao excluir dependente. Tente novamente.',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    

    const handleEdit = (id: number) => {
        navigate(`/atualizarDependente/${id}`);
    };

    const openModal = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:3000/listar-titular/${id}`);
            if (response.data) {
                setDependenteDetalhes(response.data);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Erro ao obter detalhes do titular:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDependenteDetalhes(null);
    };

    return (
        <>
            <NavBar />
            <h1 className="text-center text-3xl font-bold mt-4">Dependentes Cadastrados</h1>
            <div className="p-4">
                <div className="w-full bg-white shadow-lg rounded-lg">
                    <ul className="list-none">
                        {dependentes.length === 0 ? (
                            <p className="text-center p-4">Nenhum dependente cadastrado.</p>
                        ) : (
                            <ul className="list-none">
                                {dependentes.map((dependente) => (
                                    <li key={dependente.id} className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                                        <span>{dependente.nome}</span>
                                        <div className="flex space-x-2">

                                            <button
                                                onClick={() => openModal(dependente.id)}
                                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                type="button"
                                            >
                                                Detalhes                        </button>
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
                        )}
                    </ul>
                    <Modal isOpen={isModalOpen} onClose={closeModal} title="Detalhes do Dependente">
                        {dependentesDetalhes && (
                            <div>
                                <p><strong>Nome:</strong> {dependentesDetalhes.nome}</p>
                                <p><strong>Nome Social:</strong> {dependentesDetalhes.nomeSocial}</p>
                                <p><strong>Data de Nascimento:</strong> {new Date(dependentesDetalhes.dataNascimento).toLocaleDateString()}</p>

                                <h3><strong>Telefones:</strong></h3>
                                <ul>
                                    {dependentesDetalhes.telefones.length > 0 ? (
                                        dependentesDetalhes.telefones.map((telefone, index) => (
                                            <li key={index}>{telefone.ddd} {telefone.numero}</li>
                                        ))
                                    ) : (
                                        <li>Não há telefones cadastrados</li>
                                    )}
                                </ul>

                                <h3><strong>Endereço:</strong></h3>
                                {dependentesDetalhes.endereco ? (
                                    <p>
                                        {dependentesDetalhes.endereco.rua}, {dependentesDetalhes.endereco.bairro}, {dependentesDetalhes.endereco.cidade},
                                        {dependentesDetalhes.endereco.estado}, {dependentesDetalhes.endereco.pais}, CEP: {dependentesDetalhes.endereco.codigoPostal}
                                    </p>
                                ) : (
                                    <p>Não há endereço cadastrado</p>
                                )}

                                <h3><strong>Documentos:</strong></h3>
                                <ul>
                                    {dependentesDetalhes.documentos.length > 0 ? (
                                        dependentesDetalhes.documentos.map((documento, index) => (
                                            <li key={index}>{documento.tipo}: {documento.numero} - Emitido em: {new Date(documento.dataExpedicao).toLocaleDateString()}</li>
                                        ))
                                    ) : (
                                        <li>Não há documentos cadastrados</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default ListagemDependentes;
