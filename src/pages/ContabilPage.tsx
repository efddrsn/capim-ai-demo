import React from 'react';
import { Calculator, FileText, PieChart, DollarSign } from 'lucide-react';

const ContabilPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Contábil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Receita Bruta</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 45.200</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Calculator className="w-8 h-8 text-red-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Despesas</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 12.800</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <PieChart className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Lucro Líquido</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 32.400</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Impostos</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 5.680</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Resumo Financeiro</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                <span>Receita de Serviços</span>
                <span className="font-semibold text-green-600">R$ 42.100</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                <span>Venda de Produtos</span>
                <span className="font-semibold text-green-600">R$ 3.100</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                <span>Custos Operacionais</span>
                <span className="font-semibold text-red-600">- R$ 8.200</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                <span>Despesas Administrativas</span>
                <span className="font-semibold text-red-600">- R$ 4.600</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Impostos e Tributos</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>ISS (5%)</span>
                <span className="font-semibold">R$ 2.105</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>IRPJ</span>
                <span className="font-semibold">R$ 1.420</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>CSLL</span>
                <span className="font-semibold">R$ 980</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>PIS/COFINS</span>
                <span className="font-semibold">R$ 1.175</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContabilPage;