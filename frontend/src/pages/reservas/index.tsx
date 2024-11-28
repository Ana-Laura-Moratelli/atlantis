import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import NavBar from '../../components/navbar';
import Swal from 'sweetalert2';
import Reserva from '../../types/reserva'
import Cliente from '../../types/cliente'
import Acomodacao from '../../types/acomodacoes'

function Reservas() {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [tipoCliente, setTipoCliente] = useState('');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteId, setClienteId] = useState('');
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
    const [acomodacaoId, setAcomodacaoId] = useState('');

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/listar-reservas');
                setReservas(response.data);
            } catch (error) {
                console.error('Erro ao buscar reservas:', error);
            }
        };

        const fetchAcomodacoes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/listar-acomodacoes');
                setAcomodacoes(response.data);
            } catch (error) {
                console.error('Erro ao buscar acomodações:', error);
            }
        };

        fetchReservas();
        fetchAcomodacoes();
    }, []);

    useEffect(() => {
        const fetchClientes = async () => {
            if (!tipoCliente) return;

            try {
                const endpoint = tipoCliente === 'Titular' ? 'listar-titulares' : 'listar-dependentes';
                const response = await axios.get(`http://localhost:3000/${endpoint}`);
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        fetchClientes();
    }, [tipoCliente]);

    const handleExcluir = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/excluir-reserva/${id}`);
            setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== id));
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Reserva excluída com sucesso',
                confirmButtonColor: '#3871C1',
            });
        } catch (error) {
            console.error('Erro ao excluir reserva:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao excluir reserva',
                confirmButtonColor: '#3871C1',
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!tipoCliente || !clienteId || !acomodacaoId) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, preencha todos os campos.',
                confirmButtonColor: '#3871C1',
            });
            return;
        }

        const data = {
            clienteId,
            acomodacaoId,
        };

        try {
            await axios.post('http://localhost:3000/cadastrar-reserva', data);
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Reserva cadastrada com sucesso',
                confirmButtonColor: '#3871C1',
            });
            const response = await axios.get('http://localhost:3000/listar-reservas');
            setReservas(response.data);

            setTipoCliente('');
            setClientes([]);
            setClienteId('');
            setAcomodacaoId('');
        } catch (error) {
            console.error('Erro ao cadastrar reserva:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao cadastrar reserva',
                confirmButtonColor: '#3871C1',
            });
        }
    };

    return (
        <>
            <NavBar />

            <h1 className="text-center text-3xl font-bold">Reservas</h1>

            <div className="p-4">
                <div className="w-full bg-white shadow-lg rounded-lg">
                    <ul className="list-none">
                        {reservas.map((reserva) => (
                            <li key={reserva.id} className="flex flex-col p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex flex-col mr-6 text-center">
                                        <span>Cliente: {reserva.cliente}</span>
                                        <span>Acomodação: {reserva.acomodacao}</span>
                                    </div>
                                    <div className="flex flex-col text-center">
                                        <span>Leitos para solteiros: {reserva.leitosSolteiro}</span>
                                        <span>Leitos para casais: {reserva.leitosCasal}</span>
                                        <span>Climatização: {reserva.climatizacao}</span>
                                        <span>Garagens: {reserva.garagens}</span>
                                        <span>Suítes: {reserva.suites}</span>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center pt-4">
                                    <button
                                        onClick={() => handleExcluir(reserva.id)}
                                        className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <form className="mx-auto p-4 px-5" onSubmit={handleSubmit}>
                <select
                    value={tipoCliente}
                    onChange={(e) => {
                        setTipoCliente(e.target.value);
                        setClienteId('');
                        setClientes([]);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                    focus:border-blue-500 block w-full p-2.5 mb-5"
                    required
                >
                    <option value="">Selecione o tipo de cliente</option>
                    <option value="Titular">Titular</option>
                    <option value="Dependente">Dependente</option>
                </select>

                {tipoCliente && (
                    <select
                        value={clienteId}
                        onChange={(e) => setClienteId(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                        focus:border-blue-500 block w-full p-2.5 mb-5"
                        required
                    >
                        <option value="">Selecione o cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                )}

                <select
                    value={acomodacaoId}
                    onChange={(e) => setAcomodacaoId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                    focus:border-blue-500 block w-full p-2.5 mb-5"
                    required
                >
                    <option value="">Selecione a acomodação</option>
                    {acomodacoes.map((acomodacao) => (
                        <option key={acomodacao.id} value={acomodacao.id}>
                            {acomodacao.nome}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Reservar
                </button>
            </form>
        </>
    );
}

export default Reservas;
