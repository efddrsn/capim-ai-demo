import React from 'react';
import { MessageSquare, Send, Users, Settings } from 'lucide-react';

const ComunicacaoPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Send className="w-4 h-4" />
          Nova Campanha
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Mensagens Enviadas</p>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Contatos Ativos</p>
              <p className="text-2xl font-bold text-green-600">456</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Automações</p>
              <p className="text-2xl font-bold text-purple-600">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taxa de Resposta</p>
              <p className="text-2xl font-bold text-orange-600">78%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Últimas Interações</h3>
        <div className="space-y-3">
          <div className="p-3 border border-gray-200 rounded-lg">
            <p className="font-medium">Lembrete de consulta enviado para Maria Silva</p>
            <p className="text-sm text-gray-600">Há 2 horas</p>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <p className="font-medium">Campanha de reativação finalizada</p>
            <p className="text-sm text-gray-600">Há 1 dia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComunicacaoPage; 