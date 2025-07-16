import React from 'react';
import { Package, AlertTriangle, Plus } from 'lucide-react';

const EstoquePage: React.FC = () => {
  const inventory = [
    { id: 1, item: 'Seringa Descartável', quantity: 150, minStock: 50, category: 'Descartáveis' },
    { id: 2, item: 'Luvas de Procedimento', quantity: 25, minStock: 100, category: 'EPI' },
    { id: 3, item: 'Amalgama Dental', quantity: 8, minStock: 5, category: 'Materiais' },
    { id: 4, item: 'Anestésico Local', quantity: 12, minStock: 10, category: 'Medicamentos' },
  ];

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity <= minStock) {
      return { status: 'Baixo', color: 'bg-red-100 text-red-800' };
    } else if (quantity <= minStock * 1.5) {
      return { status: 'Médio', color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { status: 'OK', color: 'bg-green-100 text-green-800' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Estoque</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Item
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Total de Itens</h3>
              <p className="text-2xl font-bold text-gray-900">124</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Estoque Baixo</h3>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Valor Total</h3>
              <p className="text-2xl font-bold text-gray-900">R$ 12.4k</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Itens do Estoque</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque Mínimo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => {
                const stockStatus = getStockStatus(item.quantity, item.minStock);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {item.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.minStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${stockStatus.color}`}>
                        {stockStatus.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EstoquePage;