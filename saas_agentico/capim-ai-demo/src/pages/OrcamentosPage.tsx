import React from 'react';
import { FileText, Plus, Search, Filter, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';

const OrcamentosPage: React.FC = () => {
  const orcamentos = [
    {
      id: 1,
      paciente: "Maria Silva",
      telefone: "(11) 99999-1234",
      procedimento: "Implante + Coroa",
      valor: 4500,
      status: "aguardando",
      dataOrcamento: "2024-01-15",
      prazoValidade: "2024-02-15",
      probabilidade: 75
    },
    {
      id: 2,
      paciente: "João Santos",
      telefone: "(11) 88888-5678",
      procedimento: "Aparelho Ortodôntico",
      valor: 3200,
      status: "aprovado",
      dataOrcamento: "2024-01-12",
      prazoValidade: "2024-02-12",
      probabilidade: 90
    },
    {
      id: 3,
      paciente: "Ana Costa",
      telefone: "(11) 77777-9012",
      procedimento: "Clareamento + Limpeza",
      valor: 850,
      status: "rejeitado",
      dataOrcamento: "2024-01-10",
      prazoValidade: "2024-02-10",
      probabilidade: 20
    },
    {
      id: 4,
      paciente: "Carlos Oliveira",
      telefone: "(11) 66666-3456",
      procedimento: "Prótese Parcial",
      valor: 2800,
      status: "em_negociacao",
      dataOrcamento: "2024-01-18",
      prazoValidade: "2024-02-18",
      probabilidade: 60
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aguardando': return 'bg-yellow-100 text-yellow-800';
      case 'aprovado': return 'bg-green-100 text-green-800';
      case 'rejeitado': return 'bg-red-100 text-red-800';
      case 'em_negociacao': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aguardando': return <Clock className="w-4 h-4" />;
      case 'aprovado': return <CheckCircle className="w-4 h-4" />;
      case 'rejeitado': return <XCircle className="w-4 h-4" />;
      case 'em_negociacao': return <TrendingUp className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aguardando': return 'Aguardando';
      case 'aprovado': return 'Aprovado';
      case 'rejeitado': return 'Rejeitado';
      case 'em_negociacao': return 'Em Negociação';
      default: return status;
    }
  };

  const totalOrcamentos = orcamentos.length;
  const valorTotal = orcamentos.reduce((acc, orc) => acc + orc.valor, 0);
  const aprovados = orcamentos.filter(orc => orc.status === 'aprovado').length;
  const taxaConversao = (aprovados / totalOrcamentos * 100).toFixed(1);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Orçamentos</h1>
        <p className="text-gray-600">Gerencie seu funil de vendas e acompanhe a conversão de orçamentos</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Orçamentos</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrcamentos}</p>
            </div>
            <FileText className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">R$ {valorTotal.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aprovados</p>
              <p className="text-2xl font-bold text-gray-900">{aprovados}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taxa de Conversão</p>
              <p className="text-2xl font-bold text-gray-900">{taxaConversao}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus className="w-4 h-4" />
              Novo Orçamento
            </button>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar paciente..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Orçamentos */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Procedimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Probabilidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orcamentos.map((orcamento) => (
                <tr key={orcamento.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{orcamento.paciente}</div>
                      <div className="text-sm text-gray-500">{orcamento.telefone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{orcamento.procedimento}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      R$ {orcamento.valor.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(orcamento.status)}`}>
                      {getStatusIcon(orcamento.status)}
                      {getStatusText(orcamento.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${orcamento.probabilidade}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{orcamento.probabilidade}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(orcamento.prazoValidade).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Editar
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      Aprovar
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Rejeitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrcamentosPage; 