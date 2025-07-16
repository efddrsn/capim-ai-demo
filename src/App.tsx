import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AgendaPage from './pages/AgendaPage';
import ConsultationModePage from './pages/ConsultationModePage';
import PacientesPage from './pages/PacientesPage';
import OrcamentosPage from './pages/OrcamentosPage';
import FinanceiroPage from './pages/FinanceiroPage';
import EstoquePage from './pages/EstoquePage';
import ComunicacaoPage from './pages/ComunicacaoPage';
import RelatoriosPage from './pages/RelatoriosPage';
import ContabilPage from './pages/ContabilPage';

function App() {
  return (
    <Router basename="/capim-ai-demo">
      <Routes>
        {/* Modo consulta - fora do layout padrão para experiência mobile otimizada */}
        <Route path="/consultation-mode" element={<ConsultationModePage />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="pacientes" element={<PacientesPage />} />
          <Route path="orcamentos" element={<OrcamentosPage />} />
          <Route path="financeiro" element={<FinanceiroPage />} />
          <Route path="estoque" element={<EstoquePage />} />
          <Route path="comunicacao" element={<ComunicacaoPage />} />
          <Route path="relatorios" element={<RelatoriosPage />} />
          <Route path="contabil" element={<ContabilPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;