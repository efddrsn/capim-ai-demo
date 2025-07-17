import React from 'react';
import { BarChart3, TrendingUp, FileText, Download } from 'lucide-react';

const RelatoriosPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FileText className="w-4 h-4" />
          Novo Relatório
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Faturamento (Mês)</p>
              <p className="text-2xl font-bold text-green-600">R$ 15.240</p>
              <p className="text-xs text-green-600">+12% vs mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Consultas (Mês)</p>
              <p className="text-2xl font-bold text-blue-600">89</p>
              <p className="text-xs text-blue-600">+5% vs mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pacientes Novos</p>
              <p className="text-2xl font-bold text-purple-600">23</p>
              <p className="text-xs text-purple-600">+8% vs mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ticket Médio</p>
              <p className="text-2xl font-bold text-orange-600">R$ 171</p>
              <p className="text-xs text-orange-600">+3% vs mês anterior</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Relatórios Rápidos</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span>Faturamento por Procedimento</span>
              <Download className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span>Análise de Inadimplência</span>
              <Download className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span>Performance dos Profissionais</span>
              <Download className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Insights Recentes</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-medium text-green-800">📈 Crescimento Positivo</p>
              <p className="text-sm text-green-700">Faturamento aumentou 12% este mês</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-blue-800">👥 Novos Pacientes</p>
              <p className="text-sm text-blue-700">23 novos cadastros neste período</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatoriosPage; 