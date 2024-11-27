import NavBar from '../../components/navbar';

function Listagem() {
    return (
        <>
            <NavBar />
            <h1 className="text-center text-3xl font-medium mt-4 pt-4 pb-4">Listagem de Titulares e seus dependentes</h1>
            <div className="p-4">
                <div className="w-full bg-white shadow-lg rounded-lg">
                    <ul className="list-none">
                    <li className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <span>Ana</span>
                            <span className="flex flex-col items-start space-y-1">
                                <span>Dependente 1</span>
                                <span>Dependente 2</span>
                                <span>Dependente 3</span>
                            </span>
                        </li>
                        <li className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <span>Ana</span>
                            <span className="flex flex-col items-start space-y-1">
                                <span>Dependente 1</span>
                                <span>Dependente 2</span>
                                <span>Dependente 3</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <h2 className="text-center text-3xl font-medium mt-4 pt-4 pb-4">Listagem de dependentes e seus titulares</h2>
            <div className="p-4">
                <div className="w-full bg-white shadow-lg rounded-lg">
                    <ul className="list-none">
                        <li className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <span>João</span>
                            <span>Titular: Ana</span>
                        </li>
                        <li className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                            <span>João</span>
                            <span>Titular: Ana</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Listagem;
