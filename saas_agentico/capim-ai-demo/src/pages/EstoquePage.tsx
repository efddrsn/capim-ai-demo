import React from 'react';
import { Package, AlertTriangle, ShoppingCart, TrendingUp } from 'lucide-react';

const EstoquePage: React.FC = () => {
  // Dados de exemplo para estoque
  const itensEstoque = [
    {
      id: 1,
      nome: "Anestésico Lidocaína",
      categoria: "Medicamentos",
      quantidadeAtual: 5,
      quantidadeMinima: 10,
      status: "baixo",
      ultimaCompra: "10/12/2024",
      valorUnitario: 25.50
    },
    {
      id: 2,
      nome: "Luvas Descartáveis",
      categoria: "Materiais",
      quantidadeAtual: 200,
      quantidadeMinima: 50,
      status: "ok",
      ultimaCompra: "20/12/2024",
      valorUnitario: 0.85
    },
    {
      id: 3,
      nome: "Brocas Diamantadas",
      categoria: "Instrumentos",
      quantidadeAtual: 2,
      quantidadeMinima: 5,
      status: "baixo",
      ultimaCompra: "15/11/2024",
      valorUnitario: 45.00
    },
    {
      id: 4,
      nome: "Resina Composta",
      categoria: "Materiais",
      quantidadeAtual: 15,
      quantidadeMinima: 8,
      status: "ok",
      ultimaCompra: "18/12/2024",
      valorUnitario: 120.00
    }
  ];

  const itensComEstoqueBaixo = itensEstoque.filter(item => item.status === 'baixo').length;
  const valorTotalEstoque = itensEstoque.reduce((total, item) => total + (item.quantidadeAtual * item.valorUnitario), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Package className="w-4 h-4" />
            Novo Item
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            Gerar Pedido
          </button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Itens</p>
              <p className="text-2xl font-bold text-gray-800">{itensEstoque.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Estoque Baixo</p>
              <p className="text-2xl font-bold text-red-600">{itensComEstoqueBaixo}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {valorTotalEstoque.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Itens p/ Repor</p>
              <p className="text-2xl font-bold text-purple-600">{itensComEstoqueBaixo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta de Estoque Baixo */}
      {itensComEstoqueBaixo > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold">Atenção: Itens com estoque baixo!</h3>
          </div>
          <p className="text-red-700 mt-1">
            {itensComEstoqueBaixo} item(ns) estão abaixo do estoque mínimo. Considere fazer um novo pedido.
          </p>
        </div>
      )}

      {/* Lista de Itens */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Itens em Estoque</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {itensEstoque.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.status === 'baixo' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      <Package className={`w-5 h-5 ${
                        item.status === 'baixo' ? 'text-red-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.nome}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{item.categoria}</span>
                        <span>Última compra: {item.ultimaCompra}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'baixo' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {item.status === 'baixo' ? 'Estoque Baixo' : 'OK'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Atual:</strong> {item.quantidadeAtual} un.</p>
                    <p><strong>Mínimo:</strong> {item.quantidadeMinima} un.</p>
                    <p><strong>Valor:</strong> R$ {item.valorUnitario.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstoquePage; 