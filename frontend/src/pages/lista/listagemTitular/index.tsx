import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../../components/navbar';
import Modal from '../../../components/modal';
import Swal from 'sweetalert2';
import Cliente from '../../../types/cliente';

function ListagemTitular() {
    const [titulares, setTitulares] = useState<Cliente[]>([]);
    const [titularDetalhes, setTitularDetalhes] = useState<Cliente | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchTitulares = async () => {
            try {
                const response = await axios.get('http://localhost:3000/listar-titulares');
                setTitulares(response.data);
            } catch (error) {
                console.error('Erro ao listar titulares:', error);
            }
        };
        fetchTitulares();
    }, [location]);


    const handleDelete = async (id: number) => {
        const confirmation = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Esta ação excluirá o titular e todos os dependentes associados, caso existam. Deseja continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (confirmation.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/excluir-titular/${id}`);
                setTitulares((prev) => prev.filter((titular) => titular.id !== id));

                Swal.fire({
                    icon: 'success',
                    title: 'Excluído com sucesso!',
                    text: 'O titular foi excluído com sucesso.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data?.message;

                    if (errorMessage === 'Não é possível excluir o titular com reservas associadas') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Titular possui reservas',
                            text: 'O titular não pode ser excluído porque possui reservas associadas.',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        });
                    } else if (errorMessage === 'Não é possível excluir o titular porque seus dependentes possuem reservas associadas') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Dependentes possuem reservas',
                            text: 'O titular não pode ser excluído porque seus dependentes possuem reservas associadas.',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro ao excluir titular. Tente novamente.',
                            confirmButtonColor: '#d33',
                            confirmButtonText: 'OK'
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Erro inesperado ao excluir titular. Tente novamente.',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    });
                }
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Cancelado',
                text: 'A exclusão foi cancelada.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        }
    };


    const handleEdit = (id: number) => {
        navigate(`/atualizarTitular/${id}`);
    };

    const openModal = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:3000/listar-titular/${id}`);
            if (response.data) {
                setTitularDetalhes(response.data);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Erro ao obter detalhes do titular:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTitularDetalhes(null);
    };

    return (
        <>
            <NavBar />
            <h1 className="text-center text-3xl font-bold mt-4">Titulares Cadastrados</h1>
            <div className="p-4">
                <div className="w-full bg-white shadow-lg rounded-lg">
                    <ul className="list-none">
                        {titulares.length === 0 ? (
                            <p className="text-center p-4">Nenhum titular cadastrado.</p>
                        ) : (
                            <ul className="list-none">
                                {titulares.map((titular) => (
                                    <li key={titular.id} className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                                        <span>{titular.nome}</span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openModal(titular.id)}
                                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                type="button"
                                            >
                                                Detalhes                        </button>
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
                        )}
                    </ul>
                    <Modal isOpen={isModalOpen} onClose={closeModal} title="Detalhes do Titular">
                        {titularDetalhes && (
                            <div>
                                <p><strong>Nome:</strong> {titularDetalhes.nome}</p>
                                <p><strong>Nome Social:</strong> {titularDetalhes.nomeSocial}</p>
                                <p><strong>Data de Nascimento:</strong> {new Date(titularDetalhes.dataNascimento).toLocaleDateString()}</p>

                                <h3><strong>Telefones:</strong></h3>
                                <ul>
                                    {titularDetalhes.telefones.length > 0 ? (
                                        titularDetalhes.telefones.map((telefone, index) => (
                                            <li key={index}>{telefone.ddd} {telefone.numero}</li>
                                        ))
                                    ) : (
                                        <li>Não há telefones cadastrados</li>
                                    )}
                                </ul>

                                <h3><strong>Endereço:</strong></h3>
                                {titularDetalhes.endereco ? (
                                    <p>
                                        {titularDetalhes.endereco.rua}, {titularDetalhes.endereco.bairro}, {titularDetalhes.endereco.cidade},
                                        {titularDetalhes.endereco.estado}, {titularDetalhes.endereco.pais}, CEP: {titularDetalhes.endereco.codigoPostal}
                                    </p>
                                ) : (
                                    <p>Não há endereço cadastrado</p>
                                )}

                                <h3><strong>Documentos:</strong></h3>
                                <ul>
                                    {titularDetalhes.documentos.length > 0 ? (
                                        titularDetalhes.documentos.map((documento, index) => (
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

export default ListagemTitular;
