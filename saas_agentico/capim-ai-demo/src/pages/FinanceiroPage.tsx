import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, AlertCircle, BarChart3 } from 'lucide-react';

const FinanceiroPage: React.FC = () => {
  // Dados de exemplo para financeiro
  const transacoes = [
    {
      id: 1,
      descricao: "Consulta - Maria Silva",
      valor: 150.00,
      data: "15/01/2025",
      tipo: "receita",
      status: "pago"
    },
    {
      id: 2,
      descricao: "Canal - João Santos",
      valor: 800.00,
      data: "14/01/2025",
      tipo: "receita",
      status: "pendente"
    },
    {
      id: 3,
      descricao: "Material Odontológico",
      valor: 320.00,
      data: "13/01/2025",
      tipo: "despesa",
      status: "pago"
    },
    {
      id: 4,
      descricao: "Limpeza - Ana Costa",
      valor: 80.00,
      data: "12/01/2025",
      tipo: "receita",
      status: "pago"
    }
  ];

  const totalReceitas = transacoes
    .filter(t => t.tipo === 'receita' && t.status === 'pago')
    .reduce((sum, t) => sum + t.valor, 0);

  const totalDespesas = transacoes
    .filter(t => t.tipo === 'despesa' && t.status === 'pago')
    .reduce((sum, t) => sum + t.valor, 0);

  const receitasPendentes = transacoes
    .filter(t => t.tipo === 'receita' && t.status === 'pendente')
    .reduce((sum, t) => sum + t.valor, 0);

  const saldoLiquido = totalReceitas - totalDespesas;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <DollarSign className="w-4 h-4" />
            Nova Receita
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <BarChart3 className="w-4 h-4" />
            Relatórios
          </button>
        </div>
      </div>

      {/* Cards de Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Receitas (Mês)</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {totalReceitas.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Despesas (Mês)</p>
              <p className="text-2xl font-bold text-red-600">
                R$ {totalDespesas.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${saldoLiquido >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
              <DollarSign className={`w-6 h-6 ${saldoLiquido >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Saldo Líquido</p>
              <p className={`text-2xl font-bold ${saldoLiquido >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                R$ {saldoLiquido.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">A Receber</p>
              <p className="text-2xl font-bold text-orange-600">
                R$ {receitasPendentes.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">Conciliar Transações</p>
              <p className="text-sm text-gray-600">Conferir pagamentos recebidos</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <DollarSign className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-800">Registrar Pagamento</p>
              <p className="text-sm text-gray-600">Lançar nova receita</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-800">Gerar Relatório</p>
              <p className="text-sm text-gray-600">Análise de performance</p>
            </div>
          </button>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Transações Recentes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {transacoes.map((transacao) => (
            <div key={transacao.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transacao.tipo === 'receita' 
                        ? 'bg-green-100' 
                        : 'bg-red-100'
                    }`}>
                      {transacao.tipo === 'receita' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{transacao.descricao}</h4>
                      <p className="text-sm text-gray-600">{transacao.data}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transacao.tipo === 'receita' ? '+' : '-'}R$ {transacao.valor.toFixed(2).replace('.', ',')}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transacao.status === 'pago' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {transacao.status === 'pago' ? 'Pago' : 'Pendente'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceiroPage; 