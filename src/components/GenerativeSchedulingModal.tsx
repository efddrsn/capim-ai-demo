import React, { useState } from 'react';
import { X, Calendar, Clock, User, Sparkles } from 'lucide-react';

interface GenerativeSchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GenerativeSchedulingModal: React.FC<GenerativeSchedulingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [aiSuggestion, setAiSuggestion] = useState('');

  if (!isOpen) return null;

  const handleAISuggestion = () => {
    setAiSuggestion('Com base no histórico do paciente e disponibilidade, sugiro agendar para terça-feira às 14h30 para consulta de retorno. O paciente prefere horários à tarde e terças-feiras têm menos cancelamentos.');
    setStep(2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Agendamento Inteligente
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 inline mr-1" />
                Paciente
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Selecione um paciente</option>
                <option>Maria Silva</option>
                <option>Pedro Santos</option>
                <option>Ana Costa</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Consulta
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Consulta de Rotina</option>
                <option>Limpeza</option>
                <option>Tratamento de Canal</option>
                <option>Ortodontia</option>
                <option>Extração</option>
              </select>
            </div>
            
            <button
              onClick={handleAISuggestion}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Gerar Sugestão com IA
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-900 mb-2">Sugestão da IA</h3>
                  <p className="text-sm text-purple-800">{aiSuggestion}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Data
                </label>
                <input
                  type="date"
                  defaultValue="2024-01-23"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Horário
                </label>
                <input
                  type="time"
                  defaultValue="14:30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirmar Agendamento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerativeSchedulingModal;