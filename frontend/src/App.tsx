import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Listagem from './pages/lista/listagem';
import CadastrarTitular from './pages/cadastrar/cadastrarTitular';
import CadastrarDependente from './pages/cadastrar/cadastrarDependente';
import ListagemTitular from './pages/lista/listagemTitular';
import ListagemDependente from './pages/lista/listagemDependente';
import AtualizarTitular from './pages/atualizar/atualizarTitular';
import AtualizarDependente from './pages/atualizar/atualizarDepentente';
import Acomodacoes from './pages/acomodacoes';
import Reservas from './pages/reservas';
import PrivateRoute from './components/privateRoute';
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/listagem" element={<PrivateRoute><Listagem /></PrivateRoute>} />
        <Route path="/cadastrarTitular" element={<PrivateRoute><CadastrarTitular /></PrivateRoute>} />
        <Route path="/cadastrarDependente" element={<PrivateRoute><CadastrarDependente /></PrivateRoute>} />
        <Route path="/listagemTitular" element={<PrivateRoute><ListagemTitular /></PrivateRoute>} />
        <Route path="/listagemDependente" element={<PrivateRoute><ListagemDependente /></PrivateRoute>} />
        <Route path="/atualizarTitular" element={<PrivateRoute><AtualizarTitular /></PrivateRoute>} />
        <Route path="/atualizarTitular/:id" element={<PrivateRoute><AtualizarTitular /></PrivateRoute>} />
        <Route path="/atualizarDependente" element={<PrivateRoute><AtualizarDependente /></PrivateRoute>} />
        <Route path="/atualizarDependente/:id" element={<PrivateRoute><AtualizarDependente /></PrivateRoute>} />
        <Route path="/acomodacoes" element={<PrivateRoute><Acomodacoes /></PrivateRoute>} />
        <Route path="/reservas" element={<PrivateRoute><Reservas /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
