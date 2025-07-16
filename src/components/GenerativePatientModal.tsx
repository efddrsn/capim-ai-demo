import React, { useState } from 'react';
import { X, Sparkles, User, Phone, Mail, Calendar, MapPin } from 'lucide-react';

interface GenerativePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GenerativePatientModal: React.FC<GenerativePatientModalProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(1);
  const [generatedData, setGeneratedData] = useState<any>(null);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simular geração de dados
    setTimeout(() => {
      setGeneratedData({
        name: 'Maria José da Silva',
        phone: '(11) 98765-4321',
        email: 'maria.silva@email.com',
        birthDate: '1985-03-15',
        address: 'Rua das Flores, 123, Vila Madalena, São Paulo - SP',
        notes: 'Paciente com histórico de sensibilidade dentária. Prefere consultas no período da tarde. Já realizou tratamento ortodôntico.'
      });
      setIsGenerating(false);
      setStep(2);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Cadastro Inteligente de Paciente
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
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-2">IA Generativa</h3>
                  <p className="text-sm text-blue-800">
                    Nossa IA pode gerar automaticamente dados de exemplo para demonstração, 
                    preenchendo todos os campos com informações realistas.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prompt para IA (opcional)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Ex: Gere dados para uma paciente mulher, 35-40 anos, que mora em São Paulo..."
              />
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Gerar Dados com IA
                </>
              )}
            </button>
            
            <div className="text-center">
              <span className="text-gray-500 text-sm">ou</span>
            </div>
            
            <button
              onClick={() => setStep(2)}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Preencher Manualmente
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            {generatedData && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200 mb-4">
                <div className="flex items-center gap-2 text-green-800 text-sm">
                  <Sparkles className="w-4 h-4" />
                  Dados gerados pela IA. Você pode editá-los abaixo.
                </div>
              </div>
            )}
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  defaultValue={generatedData?.name || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite o nome do paciente"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    defaultValue={generatedData?.phone || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Nascimento
                  </label>
                  <input
                    type="date"
                    defaultValue={generatedData?.birthDate || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={generatedData?.email || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@exemplo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Endereço
                </label>
                <input
                  type="text"
                  defaultValue={generatedData?.address || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rua, número, bairro, cidade"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  defaultValue={generatedData?.notes || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Histórico médico, preferências, etc."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Criar Paciente
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerativePatientModal;