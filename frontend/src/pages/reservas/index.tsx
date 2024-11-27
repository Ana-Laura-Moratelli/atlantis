import { useState } from 'react';
import NavBar from '../../components/navbar';

function Reservas() {
  
    const [reservas, setReservas] = useState([
        {
            id: 1,
            cliente: 'Ana',
            acomodacao: 'Casal Simples',
            leitosSolteiro: 1,
            leitosCasal: 0,
            climatizacao: 'sim',
            garagens: 0,
            suites: 1,
        },
    ]);

    const handleExcluir = (id: number) => {
        setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== id));
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
                                        <span>Suites: {reserva.suites}</span>
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

            <form className="mx-auto p-4 px-5">
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5">
                    <option selected>Selecione o tipo de acomodação</option>
                    <option value="Casal Simples">Casal Simples</option>
                    <option value="Família Simples">Família Simples</option>
                    <option value="Família Mais">Família Mais</option>
                    <option value="Família Super">Família Super</option>
                    <option value="Solteiro Simples">Solteiro Simples</option>
                    <option value="Solteiro Mais">Solteiro Mais</option>
                </select>

                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5">
                    <option selected>Selecione o tipo do cliente</option>
                    <option value="Titular">Titular</option>
                    <option value="Dependente">Dependente</option>
                </select>

                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5">
                    <option selected>Selecione cliente</option>
                    <option value="Ana">Ana</option>
                    <option value="João">João</option>
                </select>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reservar</button>
            </form>
        </>
    );
}

export default Reservas;
