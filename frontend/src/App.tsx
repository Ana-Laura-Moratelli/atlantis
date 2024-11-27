
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastrarTitular from './pages/cadastrarTitular';
import CadastrarDependente from './pages/cadastrarDependente';
import Listagem from './pages/listagem';
import ListagemTitular from './pages/listagemTitular';
import ListagemDependente from './pages/listagemDependente';
import AtualizarTitular from './pages/atualizarTitular';
import AtualizarDependente from './pages/atualizarDepentente';
import Acomodacoes from './pages/acomodacoes';
import Reservas from './pages/reservas';

import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listagem />} />
        <Route path="/cadastrarTitular" element={<CadastrarTitular />}/>
        <Route path="/cadastrarDependente" element={<CadastrarDependente />}/>
        <Route path="/listagemTitular" element={<ListagemTitular />}/>
        <Route path="/listagemDependente" element={<ListagemDependente />}/>
        <Route path="/atualizarTitular" element={<AtualizarTitular />}/>
        <Route path="/atualizarTitular/:id" element={<AtualizarTitular />}/>
        <Route path="/atualizarDependente" element={<AtualizarDependente />}/>
        <Route path="/atualizarDependente/:id" element={<AtualizarDependente />}/>
        <Route path="/acomodacoes" element={<Acomodacoes />}/>
        <Route path="/reservas" element={<Reservas />}/>
      </Routes>
    </Router>
  );
}

export default App
