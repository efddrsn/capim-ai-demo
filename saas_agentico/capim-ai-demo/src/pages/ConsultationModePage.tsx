import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  User,
  Clock,
  Mic,
  FileText,
  NotebookPen,
  Activity,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  CheckCircle,
  Brain,
  Square
} from 'lucide-react';

interface PatientInfo {
  id: string;
  name: string;
  age: number;
  photo?: string;
  allergies: string[];
  mainConcerns: string[];
  lastVisit: string;
  medicalHistory: string[];
}

interface ChecklistItem {
  id: string;
  category: 'instruments' | 'allergies' | 'consents';
  text: string;
  completed: boolean;
  required: boolean;
}

interface AIInsight {
  id: string;
  type: 'suggestion' | 'observation' | 'warning';
  text: string;
  timestamp: string;
}

const ConsultationModePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados principais
  const [isRecording, setIsRecording] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [showSidePanel, setShowSidePanel] = useState(false);
  
  // Dados do paciente (normalmente viriam da API)
  const [patient] = useState<PatientInfo>({
    id: '1',
    name: 'Maria Silva',
    age: 35,
    photo: undefined,
    allergies: ['Penicilina', 'Látex'],
    mainConcerns: ['Dor no dente 16', 'Sensibilidade ao frio'],
    lastVisit: '2024-01-15',
    medicalHistory: ['Hipertensão controlada', 'Diabetes tipo 2']
  });

  // Checklist automático
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', category: 'instruments', text: 'Instrumentos esterilizados', completed: false, required: true },
    { id: '2', category: 'instruments', text: 'Anestésico preparado', completed: false, required: true },
    { id: '3', category: 'allergies', text: 'Verificado alergia à Penicilina', completed: false, required: true },
    { id: '4', category: 'allergies', text: 'Verificado alergia ao Látex', completed: false, required: true },
    { id: '5', category: 'consents', text: 'Termo de consentimento assinado', completed: false, required: false },
    { id: '6', category: 'instruments', text: 'Raio-X disponível', completed: false, required: false }
  ]);

  // Insights da AI
  const [aiInsights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'suggestion',
      text: 'Baseado no histórico, considere testar sensibilidade antes do procedimento.',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'observation',
      text: 'Paciente relatou melhora na dor desde a última consulta.',
      timestamp: new Date().toISOString()
    }
  ]);

  // Timer da sessão
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Formatação do timer
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handlers
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Aqui iniciaria a gravação real
    console.log('Iniciando gravação...');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Aqui pararia a gravação e processaria com AI
    console.log('Parando gravação...');
  };

  const toggleChecklist = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleActionClick = (action: string) => {
    console.log(`Ação selecionada: ${action}`);
    // Aqui seria implementada a navegação ou modal específico
  };

  // Cards de ação 2x2
  const actionCards = [
    {
      id: 'procedure',
      title: 'Registrar Procedimento',
      icon: Activity,
      color: 'bg-blue-500',
      action: () => handleActionClick('procedure')
    },
    {
      id: 'note',
      title: 'Adicionar Nota',
      icon: NotebookPen,
      color: 'bg-green-500',
      action: () => handleActionClick('note')
    },
    {
      id: 'evolution',
      title: 'Adicionar Evolução',
      icon: FileText,
      color: 'bg-purple-500',
      action: () => handleActionClick('evolution')
    },
    {
      id: 'update',
      title: 'Atualizar Ficha',
      icon: ClipboardList,
      color: 'bg-orange-500',
      action: () => handleActionClick('update')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex-1 mx-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {patient.photo ? (
                  <img src={patient.photo} alt={patient.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <User className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-semibold text-gray-900 truncate">{patient.name}</h1>
                <p className="text-sm text-gray-500">{patient.age} anos • Última visita: {patient.lastVisit}</p>
              </div>
            </div>
            
            {/* Fatos centrais de anamnese */}
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {patient.allergies.map((allergy, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    ⚠️ {allergy}
                  </span>
                ))}
                {patient.mainConcerns.slice(0, 2).map((concern, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {concern}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Timer da sessão */}
          <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="font-mono text-sm text-green-700">{formatTime(sessionTimer)}</span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-4 pb-20">
        {/* Cards de ação 2x2 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {actionCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <button
                key={card.id}
                onClick={card.action}
                className={`${card.color} text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <IconComponent className="w-8 h-8" />
                  <span className="font-medium text-sm leading-tight">{card.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Insights AI</h3>
            {isRecording && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                Real-time
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <div 
                key={insight.id} 
                className={`p-3 rounded-lg border-l-4 ${
                  insight.type === 'warning' ? 'bg-red-50 border-red-400' :
                  insight.type === 'suggestion' ? 'bg-blue-50 border-blue-400' :
                  'bg-green-50 border-green-400'
                }`}
              >
                <p className="text-sm text-gray-700">{insight.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(insight.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comando de voz fixo na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isRecording ? (
              <>
                <Square className="w-6 h-6" />
                Parar Gravação
              </>
            ) : (
              <>
                <Mic className="w-6 h-6" />
                Gravar Consulta
              </>
            )}
          </button>
          
          {isRecording && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Gravando...</span>
            </div>
          )}
        </div>
      </div>

      {/* Side Panel Dobrável */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
        showSidePanel ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Checklist</h3>
            <button 
              onClick={() => setShowSidePanel(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Fechar checklist"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Instrumentos */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Instrumentos</h4>
            {checklist.filter(item => item.category === 'instruments').map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2">
                <button
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}
                  aria-label={`${item.completed ? 'Desmarcar' : 'Marcar'} ${item.text}`}
                >
                  {item.completed && <CheckCircle className="w-3 h-3 text-white" />}
                </button>
                <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                  {item.text}
                </span>
                {item.required && !item.completed && (
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                )}
              </div>
            ))}
          </div>

          {/* Alergias */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Alergias</h4>
            {checklist.filter(item => item.category === 'allergies').map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2">
                <button
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}
                  aria-label={`${item.completed ? 'Desmarcar' : 'Marcar'} ${item.text}`}
                >
                  {item.completed && <CheckCircle className="w-3 h-3 text-white" />}
                </button>
                <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                  {item.text}
                </span>
                {item.required && !item.completed && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
              </div>
            ))}
          </div>

          {/* Consentimentos */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Consentimentos</h4>
            {checklist.filter(item => item.category === 'consents').map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2">
                <button
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}
                  aria-label={`${item.completed ? 'Desmarcar' : 'Marcar'} ${item.text}`}
                >
                  {item.completed && <CheckCircle className="w-3 h-3 text-white" />}
                </button>
                <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botão para abrir side panel */}
      {!showSidePanel && (
        <button
          onClick={() => setShowSidePanel(true)}
          className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-l-lg shadow-lg hover:bg-blue-600 transition-colors z-40"
          aria-label="Abrir checklist"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Overlay para fechar side panel */}
      {showSidePanel && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setShowSidePanel(false)}
        />
      )}
    </div>
  );
};

export default ConsultationModePage; 