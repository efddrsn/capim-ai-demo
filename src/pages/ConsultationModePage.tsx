import React from 'react';
import { Stethoscope, User, Clock, ArrowLeft } from 'lucide-react';

const ConsultationModePage: React.FC = () => {
  const currentPatient = {
    name: 'Maria Silva',
    age: 32,
    procedure: 'Limpeza e Avaliação',
    time: '14:30',
    notes: 'Paciente relata sensibilidade nos dentes'
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.close()}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <Stethoscope className="w-8 h-8 text-green-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Modo Consulta</h1>
                  <p className="text-gray-600">Interface otimizada para atendimento</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        {/* Paciente Atual */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Paciente Atual</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{currentPatient.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Idade:</strong> {currentPatient.age} anos</p>
                <p><strong>Horário:</strong> {currentPatient.time}</p>
                <p><strong>Procedimento:</strong> {currentPatient.procedure}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Observações</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                {currentPatient.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors">
            <h3 className="text-lg font-semibold mb-2">Registrar Procedimento</h3>
            <p className="text-sm opacity-90">Documentar o atendimento realizado</p>
          </button>
          
          <button className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors">
            <h3 className="text-lg font-semibold mb-2">Próxima Consulta</h3>
            <p className="text-sm opacity-90">Agendar retorno do paciente</p>
          </button>
          
          <button className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors">
            <h3 className="text-lg font-semibold mb-2">Receita/Atestado</h3>
            <p className="text-sm opacity-90">Gerar documentos médicos</p>
          </button>
        </div>

        {/* Chat Rápido com IA */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Assistente IA</h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              🤖 Olá! Posso ajudar com sugestões de tratamento ou documentação durante a consulta.
            </p>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Digite sua pergunta..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModePage;