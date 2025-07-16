import React from 'react';
import { Users, Calendar, DollarSign, Activity } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Bem-vindo ao CAPIM</h1>
        <p className="text-gray-600">Dashboard principal da clínica</p>
      </div>
      
      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Pacientes</h3>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-green-600">+12% este mês</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Consultas Hoje</h3>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-blue-600">85% ocupado</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Faturamento</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 45.2k</p>
              <p className="text-sm text-green-600">+8% vs. mês anterior</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Procedimentos</h3>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Este mês</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gráfico de Demonstração */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Visão Geral da Clínica</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
            <span>Pacientes Ativos</span>
            <span className="font-semibold">1,247</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
            <span>Consultas Agendadas</span>
            <span className="font-semibold">186</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
            <span>Faturamento Mês</span>
            <span className="font-semibold">R$ 45.200</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;