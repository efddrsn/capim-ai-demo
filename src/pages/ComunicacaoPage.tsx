import React from 'react';
import { MessageCircle, Mail, Phone, Send } from 'lucide-react';

const ComunicacaoPage: React.FC = () => {
  const campaigns = [
    { id: 1, name: 'Lembrete de Consulta', type: 'WhatsApp', sent: 45, opened: 38, date: '2024-01-15' },
    { id: 2, name: 'Promoção Clareamento', type: 'Email', sent: 120, opened: 67, date: '2024-01-12' },
    { id: 3, name: 'Retorno de Pacientes', type: 'SMS', sent: 25, opened: 22, date: '2024-01-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Comunicação</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Send className="w-4 h-4" />
          Nova Campanha
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <MessageCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">WhatsApp</h3>
              <p className="text-2xl font-bold text-gray-900">342</p>
              <p className="text-sm text-green-600">Mensagens enviadas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Mail className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-blue-600">Taxa de abertura: 68%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Phone className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">SMS</h3>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-purple-600">Taxa de leitura: 95%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Campanhas Recentes</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campanha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enviados
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Abertos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taxa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {campaign.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.sent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.opened}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.round((campaign.opened / campaign.sent) * 100)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(campaign.date).toLocaleDateString('pt-BR')}
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

export default ComunicacaoPage;