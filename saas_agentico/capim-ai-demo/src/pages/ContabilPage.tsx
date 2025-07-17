import React from 'react';
import { Calculator, FileText, AlertCircle, Calendar, TrendingUp } from 'lucide-react';

const ContabilPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contábil</h1>
        <p className="text-gray-600">Gestão fiscal e contábil da clínica</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">DAS Atual</p>
              <p className="text-2xl font-bold text-gray-900">R$ 2.847,32</p>
            </div>
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Vencimento: 20/12/2024</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documentos Pendentes</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Para envio ao contador</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Próximos Vencimentos</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Próximos 7 dias</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Impostos Pagos</p>
              <p className="text-2xl font-bold text-gray-900">R$ 28.473</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Este ano</p>
        </div>
      </div>

      {/* Seções Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DAS e Impostos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">DAS e Impostos</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">DAS Dezembro/2024</p>
                  <p className="text-sm text-gray-600">Vencimento: 20/12/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">R$ 2.847,32</p>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Gerar boleto
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">DAS Novembro/2024</p>
                  <p className="text-sm text-gray-600">Pago em: 18/11/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">R$ 2.654,18</p>
                  <span className="text-sm text-green-600">✓ Pago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentos para Contador */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Documentos para Contador</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Notas Fiscais - Nov/2024</p>
                    <p className="text-sm text-gray-600">12 documentos</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Enviar
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Extratos Bancários</p>
                    <p className="text-sm text-gray-600">3 contas</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Enviar
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Comprovantes de Pagamento</p>
                    <p className="text-sm text-gray-600">8 documentos</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendário de Obrigações */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Calendário de Obrigações</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-red-600" />
                <p className="font-medium text-red-900">20/12/2024</p>
              </div>
              <p className="text-sm text-red-800">Vencimento DAS</p>
              <p className="text-xs text-red-600">Em 5 dias</p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-yellow-600" />
                <p className="font-medium text-yellow-900">31/12/2024</p>
              </div>
              <p className="text-sm text-yellow-800">Envio documentos</p>
              <p className="text-xs text-yellow-600">Em 16 dias</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <p className="font-medium text-blue-900">15/01/2025</p>
              </div>
              <p className="text-sm text-blue-800">Declaração mensal</p>
              <p className="text-xs text-blue-600">Em 31 dias</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContabilPage; 