import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Users, FileText, DollarSign, Package, MessageCircle, BarChart3, Stethoscope, Calculator, CreditCard, X } from 'lucide-react';
import Tooltip from './Tooltip';
import { tooltips } from '../data/tooltips';

interface SidebarProps {
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMobileClose }) => {
  // Seção Atendimento & Clínico
  const atendimentoItems = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/agenda', icon: Calendar, label: 'Agenda' },
    { to: '/pacientes', icon: Users, label: 'Pacientes' },
    { to: '/orcamentos', icon: FileText, label: 'Orçamentos' },
  ];

  // Seção Gestão & Backoffice
  const gestaoItems = [
    { to: '/financeiro', icon: DollarSign, label: 'Financeiro' },
    { to: '/estoque', icon: Package, label: 'Estoque' },
    { to: '/comunicacao', icon: MessageCircle, label: 'CRM' },
    { to: '/relatorios', icon: BarChart3, label: 'Relatórios' },
    { to: '/contabil', icon: Calculator, label: 'Contábil' },
  ];

  const handleIniciarConsulta = () => {
    // Navegar para o modo consulta
    window.open('http://localhost:5173/consultation-mode', '_blank');
  };

  const handleCheckout = () => {
    // Lógica para fazer checkout
    console.log('Fazendo checkout');
  };

  const handleNavClick = () => {
    // Close mobile sidebar when navigating on mobile
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-md flex flex-col overflow-hidden">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600">CAPIM</h1>
        <button
          onClick={onMobileClose}
          className="p-2 -mr-2 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block p-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-indigo-600">CAPIM</h1>
      </div>
      
      {/* Botões de Ação Rápida */}
      <div className="px-4 mb-3 flex-shrink-0">
        <div className="space-y-2">
          <Tooltip text={tooltips.iniciarNovaConsulta}>
            <button
              onClick={handleIniciarConsulta}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
            >
              <Stethoscope className="w-4 h-4" />
              <span className="hidden sm:inline">Iniciar Nova Consulta</span>
              <span className="sm:hidden">Nova Consulta</span>
            </button>
          </Tooltip>

          <button
            onClick={handleCheckout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
          >
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Fazer Checkout</span>
            <span className="sm:hidden">Checkout</span>
          </button>
        </div>
        
        {/* Separador */}
        <div className="mt-3 border-t border-gray-200"></div>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {/* Seção Atendimento */}
        <div className="mb-3">
          <div className="px-4 py-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span className="hidden sm:inline">👩‍⚕️ Atendimento</span>
              <span className="sm:hidden">👩‍⚕️</span>
            </h3>
          </div>
          <ul>
            {atendimentoItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 lg:py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                        isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : ''
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="ml-3">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Divisor entre seções */}
        <div className="mx-4 border-t border-gray-200 mb-2"></div>

        {/* Seção Gestão */}
        <div>
          <div className="px-4 py-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span className="hidden sm:inline">⚙️ Gestão</span>
              <span className="sm:hidden">⚙️</span>
            </h3>
          </div>
          <ul>
            {gestaoItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 lg:py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                        isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : ''
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="ml-3">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar; 