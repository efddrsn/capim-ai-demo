import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';

const FinanceiroPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Receita Mensal</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 45.200</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15% vs. mês anterior
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Recebimentos</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 38.100</p>
              <p className="text-sm text-green-600">84% da receita</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingDown className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Pendente</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 7.100</p>
              <p className="text-sm text-red-600">16% em atraso</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Movimentação Recente</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded">
              <div>
                <p className="font-medium">Consulta - Maria Silva</p>
                <p className="text-sm text-gray-600">Hoje, 14:30</p>
              </div>
              <span className="text-green-600 font-semibold">+ R$ 150,00</span>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded">
              <div>
                <p className="font-medium">Limpeza - Pedro Santos</p>
                <p className="text-sm text-gray-600">Hoje, 10:00</p>
              </div>
              <span className="text-green-600 font-semibold">+ R$ 120,00</span>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded">
              <div>
                <p className="font-medium">Material Odontológico</p>
                <p className="text-sm text-gray-600">Ontem, 16:45</p>
              </div>
              <span className="text-red-600 font-semibold">- R$ 340,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceiroPage;