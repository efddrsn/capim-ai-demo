import React from 'react';
import { BarChart3, Download, Calendar, TrendingUp } from 'lucide-react';

const RelatoriosPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Exportar Dados
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Faturamento</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 45.2k</p>
              <p className="text-sm text-green-600">+15% vs. mês anterior</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Consultas</h3>
              <p className="text-2xl font-bold text-gray-900">186</p>
              <p className="text-sm text-blue-600">Este mês</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Crescimento</h3>
              <p className="text-2xl font-bold text-gray-900">12%</p>
              <p className="text-sm text-purple-600">Trimestral</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Ticket Médio</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 243</p>
              <p className="text-sm text-green-600">+8% vs. anterior</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Procedimentos Mais Realizados</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Limpeza Dental</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <span className="text-sm font-medium">45</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Obturação</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <span className="text-sm font-medium">32</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Clareamento</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <span className="text-sm font-medium">18</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Performance por Profissional</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Dr. João Silva</span>
                <div className="text-right">
                  <div className="font-semibold">R$ 18.500</div>
                  <div className="text-sm text-gray-600">78 consultas</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Dra. Maria Santos</span>
                <div className="text-right">
                  <div className="font-semibold">R$ 15.200</div>
                  <div className="text-sm text-gray-600">62 consultas</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Dr. Pedro Costa</span>
                <div className="text-right">
                  <div className="font-semibold">R$ 11.500</div>
                  <div className="text-sm text-gray-600">46 consultas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatoriosPage;