import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../../components/navbar';

interface Dependente {
  dependenteId: number;
  dependenteNome: string;
}

interface Titular {
  titularId: number;
  titularNome: string;
  dependentes: Dependente[];
}

interface TitularComDependente {
  titularId: number;
  titularNome: string;
  dependenteId: number | null;
  dependenteNome: string | null;
}

interface DependenteComTitular {
  dependenteId: number;
  dependenteNome: string;
  titularId: number;
  titularNome: string;
}

function Listagem() {
  const [titularesComDependentes, setTitularesComDependentes] = useState<Titular[]>([]);
  const [dependentesComTitulares, setDependentesComTitulares] = useState<DependenteComTitular[]>([]);

  useEffect(() => {
    axios.get<TitularComDependente[]>('http://localhost:3000/listar-titulares-com-dependentes')
      .then(response => {
        const data = response.data;
        const titularesMap: { [key: number]: Titular } = {};

        data.forEach((item) => {
          const titularId = item.titularId;

          if (!titularesMap[titularId]) {
            titularesMap[titularId] = {
              titularId: titularId,
              titularNome: item.titularNome,
              dependentes: []
            };
          }

          if (item.dependenteId && item.dependenteNome) {
            titularesMap[titularId].dependentes.push({
              dependenteId: item.dependenteId,
              dependenteNome: item.dependenteNome
            });
          }
        });

        const titularesList = Object.values(titularesMap);
        setTitularesComDependentes(titularesList);
      })
      .catch(error => {
        console.error('Erro ao obter titulares com dependentes:', error);
      });

    axios.get<DependenteComTitular[]>('http://localhost:3000/listar-dependentes-com-titulares')
      .then(response => {
        setDependentesComTitulares(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter dependentes com titulares:', error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <h1 className="text-center text-3xl font-medium mt-4 pt-4 pb-4">Listagem de Titulares e seus Dependentes</h1>
      <div className="p-4">
        <div className="w-full bg-white shadow-lg rounded-lg">
          <ul className="list-none">
            {titularesComDependentes.map((titular) => (
              <li key={titular.titularId} className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                <span>{titular.titularNome}</span>
                <span className="flex flex-col items-start space-y-1">
                  {titular.dependentes.length > 0 ? (
                    titular.dependentes.map((dependente) => (
                      <span key={dependente.dependenteId}>{dependente.dependenteNome}</span>
                    ))
                  ) : (
                    <span>Sem dependentes</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h2 className="text-center text-3xl font-medium mt-4 pt-4 pb-4">Listagem de Dependentes e seus Titulares</h2>
      <div className="p-4">
        <div className="w-full bg-white shadow-lg rounded-lg">
          <ul className="list-none">
            {dependentesComTitulares.map((item) => (
              <li key={item.dependenteId} className="flex justify-between items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                <span>{item.dependenteNome}</span>
                <span>Titular: {item.titularNome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Listagem;
