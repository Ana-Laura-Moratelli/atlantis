import NavBar from '../../components/navbar';

function Acomodacoes() {
    return (
        <>
            <NavBar />
            <h1 className="text-center text-3xl font-bold mt-4">Acomodações</h1>
            <div className="p-4">
                <div className="w-full bg-white shadow-lg rounded-lg">
                    <ul className="list-none">
                    <li className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <div className="flex flex-col text-center">
                                <span>Casal Simples</span>
                            </div>
                            <div className="flex flex-col text-center">
                            <span>Leitos para solteiros: 0</span>
                            <span>Leitos para casais: 1</span>
                            <span>Climatização: sim</span>
                            <span>Garagens: 1</span>
                            <span>Suites: 1</span>
                            </div>
                        </li>
                        <li className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <div className="flex flex-col text-center">
                                <span>Familia Mais</span>
                            </div>
                            <div className="flex flex-col text-center">
                            <span>Leitos para solteiros: 5</span>
                            <span>Leitos para casais: 1</span>
                            <span>Climatização: sim</span>
                            <span>Garagens: 2</span>
                            <span>Suites: 2</span>
                            </div>
                        </li>
                        <li className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <div className="flex flex-col text-center">
                                <span>Familia Simples</span>
                            </div>
                            <div className="flex flex-col text-center">
                            <span>Leitos para solteiros: 2</span>
                            <span>Leitos para casais: 1</span>
                            <span>Climatização: sim</span>
                            <span>Garagens: 1</span>
                            <span>Suites: 1</span>
                            </div>
                        </li>
                         <li className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <div className="flex flex-col text-center">
                                <span>Familia Super</span>
                            </div>
                            <div className="flex flex-col text-center">
                            <span>Leitos para solteiros: 6</span>
                            <span>Leitos para casais: 2</span>
                            <span>Climatização: sim</span>
                            <span>Garagens: 2</span>
                            <span>Suites: 3</span>
                            </div>
                        </li>
                        <li className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <div className="flex flex-col text-center">
                                <span>Solteiro Mais</span>
                            </div>
                            <div className="flex flex-col text-center">
                            <span>Leitos para solteiros: 0</span>
                            <span>Leitos para casais: 1</span>
                            <span>Climatização: sim</span>
                            <span>Garagens: 1</span>
                            <span>Suites: 1</span>
                            </div>
                        </li>
                        <li className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <div className="flex flex-col text-center">
                                <span>Solteiro Simples</span>
                            </div>
                            <div className="flex flex-col text-center">
                            <span>Leitos para solteiros: 1</span>
                            <span>Leitos para casais: 0</span>
                            <span>Climatização: sim</span>
                            <span>Garagens: 0</span>
                            <span>Suites: 1</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
          
        </>
    );
}

export default Acomodacoes;
