import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  MessageCircle,
  CheckCircle,
  Users,
  Calendar,
  Activity,
  PhoneCall,
  Video,
  Send,
  MapPin,
  Zap,
  DollarSign,
  Database,
  CreditCard,
  UserPlus,
  Clock,
  BarChart3,
  ArrowRight,
  Download,
  Check,
  MessageSquare,
  User,
} from 'lucide-react';
import PatientModal from '../components/PatientModal';
import GenerativeSchedulingModal from '../components/GenerativeSchedulingModal';
import GenerativePatientModal from '../components/GenerativePatientModal';

import Tooltip from '../components/Tooltip';
import { tooltips } from '../data/tooltips';
import { searchPatients, Patient } from '../data/mockData';

// --- Embedded Patient List Component ---
interface EmbeddedPatientListProps {
  patients: Patient[];
}

const EmbeddedPatientList: React.FC<EmbeddedPatientListProps> = ({ patients }) => {
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handlePatientToggle = (patientId: number) => {
    setSelectedPatients(prev => 
      prev.includes(patientId) 
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(patients.map(p => p.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDownload = () => {
    const selectedData = patients.filter(p => selectedPatients.includes(p.id));
    const csvContent = [
      'Nome,Última Visita,Telefone,Email',
      ...selectedData.map(p => `${p.name},${p.lastVisit},${p.phone},${p.email}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pacientes_inativos.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCreateCampaign = () => {
    console.log('Criando campanha para pacientes:', selectedPatients);
    alert(`Campanha criada para ${selectedPatients.length} pacientes!`);
  };

  const handleWhatsApp = (patient: Patient) => {
    const message = `Olá ${patient.name}! 👋\n\nSentimos sua falta aqui na clínica! Que tal agendar um retorno para cuidar do seu sorriso? 😊\n\nTemos horários disponíveis esta semana. Responda este WhatsApp para marcar sua consulta!\n\n🦷 Equipe Clínica`;
    const whatsappUrl = `https://wa.me/55${patient.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="mt-4 border rounded-lg bg-gray-50/50 overflow-hidden animate-fade-slide-up">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-100/70 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-800">
            Pacientes que não retornaram desde abril ({patients.length})
          </h3>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 border-b bg-white/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs font-medium text-gray-700">
                Selecionar todos
              </span>
            </label>
            <span className="text-xs text-gray-500">
              {selectedPatients.length} selecionados
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              disabled={selectedPatients.length === 0}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              <Download className="w-3 h-3" />
              CSV
            </button>
            <button
              onClick={handleCreateCampaign}
              disabled={selectedPatients.length === 0}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              <Users className="w-3 h-3" />
              Campanha
            </button>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="max-h-64 overflow-y-auto">
        {patients.map((patient, index) => (
          <div 
            key={patient.id} 
            className={`flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-white/70 transition-colors animate-fade-slide-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <input
              type="checkbox"
              checked={selectedPatients.includes(patient.id)}
              onChange={() => handlePatientToggle(patient.id)}
              className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 truncate">{patient.name}</h4>
                  <p className="text-xs text-gray-600">Última visita: {patient.lastVisit}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-xs text-gray-600">{patient.phone}</p>
                    <p className="text-xs text-gray-500 truncate max-w-32">{patient.email}</p>
                  </div>
                  <button 
                    onClick={() => handleWhatsApp(patient)}
                    className="p-1.5 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-colors transform hover:scale-105"
                    title={`Enviar WhatsApp para ${patient.name}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            {selectedPatients.includes(patient.id) && (
              <Check className="w-4 h-4 text-green-600 animate-scale-in" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Tipos e Dados da Jornada de Profissionalização ---

type Patient = {
  id: number;
  name: string;
  lastVisit: string;
  phone: string;
  email: string;
};

type Message = {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  actionCards?: { label: string; action: string }[];
  embeddedPatientList?: Patient[];
  isNew?: boolean;
};

type ChatState = 'suggestions' | 'conversation';

// Tipos para os dados
interface PacienteNaClinica {
  id: number;
  paciente: string;
  procedimento: string;
  horario: string;
  duracao: string;
  profissional: string;
  checkedIn: boolean;
  checkInTime: Date | null;
  tempo_restante: string;
}

interface ConsultaNoConsultorio {
  id: number;
  paciente: string;
  procedimento: string;
  horario: string;
  duracao: string;
  profissional: string;
  status: string;
  consultaIniciada: Date | null;
  tempo_restante: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState('');
  const [patientSuggestions, setPatientSuggestions] = useState<Patient[]>([]);
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isGenerativeModalVisible, setIsGenerativeModalVisible] = useState(false);
  const [isGenerativePatientModalVisible, setIsGenerativePatientModalVisible] = useState(false);
  
  // New chat system states
  const [chatState, setChatState] = useState<ChatState>('suggestions');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageIds, setNewMessageIds] = useState<Set<string>>(new Set());
  


  // Remove animation class after animation completes
  useEffect(() => {
    if (newMessageIds.size > 0) {
      const timer = setTimeout(() => {
        setNewMessageIds(new Set());
      }, 600); // Animation duration + small buffer
      return () => clearTimeout(timer);
    }
  }, [newMessageIds]);

  const getAIResponse = (userMessage?: string): string => {
    // Respostas específicas baseadas no texto da mensagem do usuário
    if (userMessage) {
      const messageResponses: { [key: string]: string } = {
        // Ações
        'Cadastre um novo paciente': 'Perfeito! Vou abrir o formulário de cadastro. Preciso dos dados básicos: nome completo, telefone, e-mail e data de nascimento. Tem alguma informação específica sobre este paciente?',
        'Fazer relatório de comissões': 'Relatório de comissões gerado! Este mês: R$ 3.240 em comissões distribuídas. Dr. Carlos: R$ 1.890 (procedimentos estéticos), Dra. Ana: R$ 1.350 (tratamentos gerais). Performance 12% acima do mês anterior.',
        'Compre suprimentos da semana': 'Lista de suprimentos da semana criada! Itens críticos: Anestésicos (15 tubetes), Luvas M (8 caixas), Algodão (3kg), Sugador descartável (200 unids). Total estimado: R$ 890. Gero pedido automático?',
        'Cancele os agendamentos de sexta': 'Encontrei 6 agendamentos para sexta-feira. Pacientes: Maria Silva (9h), João Santos (10h30), Ana Costa (14h), Pedro Lima (15h30), Carla Mendes (16h), Lucas Oliveira (17h). Envio notificações de cancelamento?',
        'Agende uma consulta': 'Vou ajudar com o agendamento! Para qual paciente gostaria de agendar? Horários disponíveis hoje: 16h, amanhã: 9h e 14h30, quinta: 10h e 15h.',
        'Envie um whatsapp': 'Central de WhatsApp ativada! Opções: 1) Confirmação de consultas (8 pacientes), 2) Lembretes de retorno (12 pacientes), 3) Mensagem personalizada. Qual tipo de envio prefere?',
        'Concilie as transações': 'Conciliação bancária realizada! Hoje: 12 transações, R$ 2.450 recebidos. Divergências: R$ 0,00. Métodos: PIX (40%), Cartão (35%), Dinheiro (25%). Tudo conferido e batido!',

        // Perguntas
        'Como estão minhas vendas este mês?': 'Analisei suas vendas e o faturamento está 15% acima do mês anterior! Foram R$ 28.500 contra R$ 24.780 em novembro. Destaque: procedimentos estéticos (+22%), implantes (+18%). Retenção de pacientes: 88%.',
        'Quem não voltou desde abril?': 'Encontrei 23 pacientes que não retornam desde abril. Principais: Maria Costa (última consulta 15/04, histórico R$ 2.100), João Silva (22/04, histórico R$ 1.850), Ana Santos (28/04, histórico R$ 990). Criar campanha de reativação?',
        'Qual o faturamento da semana passada?': 'Semana passada: R$ 12.350 faturados. Crescimento de 8% vs semana anterior. Breakdown: Segunda R$ 1.890, Terça R$ 2.450, Quarta R$ 2.100, Quinta R$ 2.650, Sexta R$ 3.260. Destaque: ortodontia R$ 4.200.',
        'Quantos pacientes novos tivemos?': 'Dezembro: 18 pacientes novos (vs 25 em novembro). Origem: 8 indicações (44%), 6 redes sociais (33%), 4 busca online (23%). Taxa de conversão primeira consulta: 78% (acima da média de 65%).'
      };

      // Retorna resposta específica se encontrar match exato
      if (messageResponses[userMessage]) {
        return messageResponses[userMessage];
      }

      // Se não encontrar match específico, tenta match parcial por palavras-chave
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('vendas') || lowerMessage.includes('faturamento')) {
        return 'Analisei seu faturamento e identifiquei tendências importantes. Este mês está 15% acima do anterior com destaque para procedimentos estéticos. Quer ver os detalhes completos?';
      }
      
      if (lowerMessage.includes('paciente') && (lowerMessage.includes('cadastr') || lowerMessage.includes('novo'))) {
        return 'Vou ajudar com o cadastro! Preciso dos dados básicos: nome, telefone, e-mail e data de nascimento. Tem alguma informação específica sobre este paciente?';
      }
      
      if (lowerMessage.includes('agend') || lowerMessage.includes('consulta')) {
        return 'Vou verificar sua agenda. Temos horários disponíveis hoje às 16h, amanhã às 9h e 14h30. Para qual paciente gostaria de agendar?';
      }
      
      if (lowerMessage.includes('relatório') || lowerMessage.includes('comiss')) {
        return 'Relatório de comissões atualizado! Este mês foram R$ 3.240 distribuídas entre a equipe. Performance 12% acima do mês anterior. Quer ver o breakdown detalhado?';
      }
      
      if (lowerMessage.includes('whatsapp') || lowerMessage.includes('mensagem')) {
        return 'Central de WhatsApp pronta! Posso enviar confirmações, lembretes ou mensagens personalizadas. Qual tipo de comunicação você precisa?';
      }
    }

    // Fallback para respostas gerais
    const responses = [
      'Analisei seus dados e identifiquei 3 oportunidades de melhoria na clínica.',
      'Baseado no histórico, recomendo focar na reativação de pacientes este mês.',
      'Sua performance geral está 15% acima da média. Quer ver os detalhes?',
      'Identifiquei que você tem 12 pacientes que não retornam há mais de 3 meses.',
      'Seu faturamento este mês está 8% acima do mês anterior. Excelente trabalho!',
      'Detectei que terças-feiras são seus dias mais produtivos da semana.',
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getActionCards = (userMessage?: string): { label: string; action: string }[] => {
    if (!userMessage) return [];
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Contextual action cards based on user message
    if (lowerMessage.includes('quem não voltou desde abril') || lowerMessage.includes('quem nao voltou desde abril')) {
      return [
        { label: '📝 Criar campanha de engajamento', action: 'create_engagement_campaign' },
        { label: '📋 Criar lista de pacientes', action: 'create_patient_list' },
      ];
    }
    
    if (lowerMessage.includes('vendas') || lowerMessage.includes('faturamento')) {
      return [
        { label: '📊 Relatório detalhado de vendas', action: 'detailed_sales_report' },
        { label: '📈 Análise de tendências', action: 'trends_analysis' },
        { label: '💳 Detalhes por forma de pagamento', action: 'payment_details' },
        { label: '🎯 Definir metas do próximo mês', action: 'set_goals' },
      ];
    }
    
    if (lowerMessage.includes('pacientes novos') || lowerMessage.includes('quantos pacientes')) {
      return [
        { label: '👥 Lista de pacientes novos', action: 'new_patients_list' },
        { label: '📊 Análise de origem', action: 'source_analysis' },
        { label: '📞 Acompanhar conversões', action: 'track_conversions' },
        { label: '🎯 Melhorar captação', action: 'improve_acquisition' },
      ];
    }
    
    if (lowerMessage.includes('semana passada') || lowerMessage.includes('faturamento da semana')) {
      return [
        { label: '📅 Comparar com outras semanas', action: 'compare_weeks' },
        { label: '⏰ Análise por dia da semana', action: 'daily_analysis' },
        { label: '🏆 Identificar melhores dias', action: 'best_days' },
        { label: '📋 Planejar próxima semana', action: 'plan_next_week' },
      ];
    }
    
    // Ações para pills de ação
    if (lowerMessage.includes('cadastre um novo paciente') || lowerMessage.includes('cadastrar paciente')) {
      return [
        { label: '📋 Formulário completo', action: 'full_patient_form' },
        { label: '📞 Agendar primeira consulta', action: 'schedule_first_appointment' },
        { label: '💳 Configurar plano de pagamento', action: 'setup_payment_plan' },
      ];
    }
    
    if (lowerMessage.includes('relatório de comissões') || lowerMessage.includes('comissões')) {
      return [
        { label: '👨‍⚕️ Detalhes por profissional', action: 'professional_details' },
        { label: '📊 Comparar com mês anterior', action: 'compare_commissions' },
        { label: '📈 Projeção para próximo mês', action: 'commission_projection' },
      ];
    }
    
    if (lowerMessage.includes('suprimentos') || lowerMessage.includes('compre suprimentos')) {
      return [
        { label: '📦 Ver estoque atual', action: 'current_stock' },
        { label: '🔄 Configurar pedido automático', action: 'auto_order' },
        { label: '💰 Comparar fornecedores', action: 'compare_suppliers' },
        { label: '📅 Agendar próximo pedido', action: 'schedule_order' },
      ];
    }
    
    if (lowerMessage.includes('cancelar agendamentos') || lowerMessage.includes('cancele os agendamentos')) {
      return [
        { label: '📱 Enviar notificações automáticas', action: 'send_notifications' },
        { label: '🔄 Reagendar automaticamente', action: 'auto_reschedule' },
        { label: '💰 Política de cancelamento', action: 'cancellation_policy' },
      ];
    }
    
    if (lowerMessage.includes('agende uma consulta') || lowerMessage.includes('agendamento')) {
      return [
        { label: '🗓️ Ver agenda completa', action: 'full_calendar' },
        { label: '⚡ Agendamento express', action: 'express_booking' },
        { label: '📞 Confirmar por telefone', action: 'phone_confirmation' },
      ];
    }
    
    if (lowerMessage.includes('whatsapp') || lowerMessage.includes('envie um whatsapp')) {
      return [
        { label: '📱 Enviar confirmações em lote', action: 'bulk_confirmations' },
        { label: '💬 Templates de mensagem', action: 'message_templates' },
        { label: '📊 Relatório de entregas', action: 'delivery_report' },
        { label: '🤖 Configurar respostas automáticas', action: 'auto_replies' },
      ];
    }
    
    if (lowerMessage.includes('conciliar') || lowerMessage.includes('transações')) {
      return [
        { label: '💳 Detalhes por cartão', action: 'card_details' },
        { label: '🏦 Reconciliar com banco', action: 'bank_reconciliation' },
        { label: '📊 Análise de inconsistências', action: 'inconsistency_analysis' },
      ];
    }
    
    // Default fallback actions
    return [
      { label: '📊 Ver relatório completo', action: 'show_full_report' },
      { label: '📅 Otimizar agenda', action: 'optimize_schedule' },
    ];
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Check for generative modal triggers first
      const isSchedulingAttempt = chatMessage.toLowerCase().startsWith('agendar');
      const isPatientCreationAttempt = chatMessage.toLowerCase().startsWith('cadastrar paciente');
      const isReportAttempt = chatMessage.toLowerCase().startsWith('fazer relatório') || 
                             chatMessage.toLowerCase().startsWith('gerar relatório') ||
                             chatMessage.toLowerCase().startsWith('relatório');
      
      // Se é uma tentativa de agendamento/cadastro/relatório, apenas retorna pois já foi processado
      if (isSchedulingAttempt || isPatientCreationAttempt || isReportAttempt) {
        return;
      }

      // Create user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: chatMessage.trim(),
        isNew: true
      };
      
      // Switch to conversation mode and add user message
      setChatState('conversation');
      setMessages(prev => [...prev, userMessage]);
      setNewMessageIds(new Set([userMessage.id]));
      setChatMessage('');
      
      // Simulate AI response after delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          text: getAIResponse(userMessage.text),
          actionCards: getActionCards(),
          isNew: true
        };
        setMessages(prev => [...prev, aiResponse]);
        setNewMessageIds(new Set([aiResponse.id]));
      }, 1000);
    }
  };

  const handleClearChat = () => {
    setChatState('suggestions');
    setMessages([]);
    setNewMessageIds(new Set());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Se há sugestões de pacientes, gerenciar navegação por teclado
    if (showPatientSuggestions && patientSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedPatientIndex(prev => 
          prev < patientSuggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedPatientIndex(prev => 
          prev > 0 ? prev - 1 : patientSuggestions.length - 1
        );
      } else if (e.key === 'Tab') {
        e.preventDefault();
        // Preenche com a primeira sugestão
        const firstPatient = patientSuggestions[0];
        setChatMessage(firstPatient.name);
        setShowPatientSuggestions(false);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        // Abre a ficha do primeiro paciente
        const firstPatient = patientSuggestions[0];
        openPatientRecord(firstPatient.id);
      } else if (e.key === 'Escape') {
        setShowPatientSuggestions(false);
      }
    } else if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Detecta se a query é um nome (contém apenas letras, espaços e acentos)
  const isNameQuery = (query: string): boolean => {
    return /^[a-záàâãéèêíïóôõöúçñü\s]+$/i.test(query) && query.length >= 2;
  };

  // Função para abrir perfil do paciente
  const openPatientRecord = (patientId: string) => {
    navigate(`/pacientes?patient=${patientId}`);
    setShowPatientSuggestions(false);
    setChatMessage('');
  };

  const handleChatMessageChange = (message: string) => {
    setChatMessage(message);
    
    // Busca de pacientes quando é uma query de nome
    if (isNameQuery(message)) {
      const patients = searchPatients(message);
      setPatientSuggestions(patients);
      setShowPatientSuggestions(patients.length > 0);
      setSelectedPatientIndex(0);
    } else {
      setPatientSuggestions([]);
      setShowPatientSuggestions(false);
    }
    
    // Detecta triggers generativos e mostra modal imediatamente
    const isSchedulingAttempt = message.toLowerCase().startsWith('agendar');
    const isPatientCreationAttempt = message.toLowerCase().startsWith('cadastrar paciente');
    const isReportAttempt = message.toLowerCase().startsWith('fazer relatório') || 
                           message.toLowerCase().startsWith('gerar relatório') ||
                           message.toLowerCase().startsWith('relatório');
    
    if (isSchedulingAttempt) {
      setIsGenerativeModalVisible(true);
      setIsGenerativePatientModalVisible(false);
      setShowPatientSuggestions(false);
    } else if (isPatientCreationAttempt) {
      setIsGenerativePatientModalVisible(true);
      setIsGenerativeModalVisible(false);
      setShowPatientSuggestions(false);
    } else if (isReportAttempt) {
      // Para demonstrar: por agora, vamos apenas simular que o relatório seria gerado
      // Em uma implementação completa, aqui abriríamos um GenerativeReportModal
      console.log('🔮 Trigger detectado para geração de relatório:', message);
      setIsGenerativeModalVisible(false);
      setIsGenerativePatientModalVisible(false);
      setShowPatientSuggestions(false);
    } else if (!isNameQuery(message)) {
      // Se não é uma tentativa de agendamento/cadastro/relatório/nome, esconde os modais
      setIsGenerativeModalVisible(false);
      setIsGenerativePatientModalVisible(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setChatMessage(suggestion);
    // Auto-send the suggestion
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: suggestion,
        isNew: true
      };
      
      setChatState('conversation');
      setMessages(prev => [...prev, userMessage]);
      setNewMessageIds(new Set([userMessage.id]));
      setChatMessage('');
      
      // Simulate AI response after delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          text: getAIResponse(userMessage.text),
          actionCards: getActionCards(userMessage.text),
          isNew: true
        };
        setMessages(prev => [...prev, aiResponse]);
        setNewMessageIds(new Set([aiResponse.id]));
      }, 1000);
    }, 100);
  };

  const closePatientModal = () => {
    setIsPatientModalOpen(false);
  };

  const closeGenerativeModal = () => {
    setIsGenerativeModalVisible(false);
  };

  const closeGenerativePatientModal = () => {
    setIsGenerativePatientModalVisible(false);
  };

  const handleSchedulingConfirmed = (schedulingData: {
    patient: string;
    procedure: string;
    date: string;
    time: string;
    isRecurrent: boolean;
    recurrencePattern: string;
  }) => {
    // Navega para a agenda com os dados do agendamento
    navigate('/agenda', { 
      state: { 
        newScheduling: schedulingData,
        showConfirmation: true 
      } 
    });
  };

  const handlePatientCreated = (patientData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    birthDate: string;
    notes: string;
  }) => {
    // Navega para a página de pacientes (ou mostra confirmação)
    console.log('Paciente criado:', patientData);
    alert(`✅ Paciente "${patientData.name}" cadastrado com sucesso!`);
  };



  // Handler for action card clicks
  const handleActionCardClick = (action: string) => {
    const actionResponses: { [key: string]: string } = {
      // Patient list actions
      'create_engagement_campaign': '📱 Campanha de WhatsApp criada! Mensagem personalizada será enviada para todos os pacientes inativos com oferta especial de 20% de desconto no retorno.',
      
      // Sales & Revenue actions
      'detailed_sales_report': '📊 Relatório detalhado: Vendas por procedimento - Limpeza: R$ 8.500 (35%), Estética: R$ 12.200 (42%), Ortodontia: R$ 6.800 (23%). Margem média: 68%.',
      'trends_analysis': '📈 Tendência: Crescimento de 8% ao mês nos últimos 6 meses. Pico em dezembro (+ 15%). Previsão janeiro: R$ 32.000 baseado em histórico.',
      'payment_details': '💳 Formas de pagamento: PIX 45% (cresceu 12%), Cartão 38%, Dinheiro 17%. Prazo médio recebimento: 2,3 dias. Taxa inadimplência: 1,8%.',
      'set_goals': '🎯 Meta sugerida para janeiro: R$ 35.000 (+23% vs dezembro). Focar em: captação de 20 novos pacientes + reativação de 15 inativos.',
      
      // New patients actions
      'new_patients_list': '👥 Pacientes novos dezembro: Ana Silva, Carlos Lima, Fernanda Costa, Roberto Alves... Total: 18 pacientes. Ticket médio: R$ 890.',
      'source_analysis': '📊 Origem pacientes: Instagram 39%, Indicação 33%, Google 17%, Facebook 11%. Instagram teve ROI de 3,2x - melhor canal!',
      'track_conversions': '📞 Taxa conversão: Instagram 12%, Google Ads 8%, Indicações 85%. Tempo médio primeira consulta: 4,2 dias após contato.',
      'improve_acquisition': '🎯 Sugestões: Aumentar investimento Instagram (+R$ 500/mês), criar programa referência (desconto indicação), melhorar landing page.',
      
      // Weekly analysis actions  
      'compare_weeks': '📅 Semana passada vs média mensal: +8% faturamento, -2% pacientes. Ticket médio subiu R$ 45. Melhor semana dos últimos 2 meses!',
      'daily_analysis': '⏰ Desempenho: Ter-Qui são picos (R$ 2.400 média). Seg/Sex mais baixos (R$ 1.600). Sábado experimental teve bom resultado.',
      'best_days': '🏆 Melhores dias: Quarta (R$ 2.650), Terça (R$ 2.450), Quinta (R$ 2.100). Considerar mais horários nestes dias.',
      'plan_next_week': '📋 Planejamento: 24 agendamentos confirmados. Receita prevista: R$ 13.500. 3 slots disponíveis terça/quinta para novos pacientes.',
      
      // Patient registration actions
      'full_patient_form': '📋 Formulário completo aberto! Campos: dados pessoais, histórico médico, preferências de contato, plano tratamento, forma pagamento.',
      'schedule_first_appointment': '📞 Agendamento primeira consulta: Horários disponíveis - Amanhã 14h, Quinta 9h30, Sexta 16h. Qual prefere?',
      'setup_payment_plan': '💳 Planos disponíveis: À vista (5% desc.), 2x sem juros, 3-6x (juros 1,2%), 10-12x (juros 2,1%). Cartão ou boleto.',
      
      // Commission actions
      'professional_details': '👨‍⚕️ Dr. Carlos: R$ 1.890 (65 procedimentos), Dra. Ana: R$ 1.350 (42 procedimentos). Performance acima da meta!',
      'compare_commissions': '📊 vs Novembro: Dr. Carlos +12%, Dra. Ana +8%. Ambos bateram metas. Bônus performance: R$ 600 total.',
      'commission_projection': '📈 Projeção janeiro: Dr. Carlos R$ 2.200, Dra. Ana R$ 1.650. Baseado em agenda atual + crescimento histórico.',
      
      // Supply actions
      'current_stock': '📦 Estoque: Anestésicos 85% (crítico), Luvas 60%, Algodão 40% (reabastecer), Materiais restauração 90%. Pedido urgente recomendado.',
      'auto_order': '🔄 Pedido automático configurado! Quando estoque chegar a 20%, sistema fará pedido automático. Fornecedor principal notificado.',
      'compare_suppliers': '💰 Melhor preço: Fornecedor A (atual) vs B: -15% anestésicos, +8% luvas. Economia potencial: R$ 230/mês trocando anestésicos.',
      'schedule_order': '📅 Próximo pedido programado: 15/01. Itens inclusos: anestésicos, algodão, luvas M. Total estimado: R$ 1.250.',
      
      // Appointment cancellation actions
      'send_notifications': '📱 Notificações enviadas! WhatsApp para 6 pacientes com explicação, pedido de desculpas e 3 opções de reagendamento.',
      'auto_reschedule': '🔄 Reagendamento automático: 4 pacientes confirmaram novos horários. 2 aguardando resposta. Taxa reagendamento: 85%.',
      'cancellation_policy': '💰 Política aplicada: Cancelamento com 24h+ antecedência = sem taxa. Emergência clínica = desconto 20% próxima consulta.',
      
      // Scheduling actions
      'full_calendar': '🗓️ Agenda completa: 89% ocupação esta semana. Próximos slots: hoje 17h, amanhã 9h30/15h, quinta 10h/14h30.',
      'express_booking': '⚡ Agendamento express ativado! Próximo horário: hoje às 17h com Dr. Carlos. Confirmar paciente e procedimento?',
      'phone_confirmation': '📞 Confirmação telefônica agendada para 14h. Lista: 6 pacientes amanhã, 4 quinta-feira. Script de confirmação carregado.',
      
      // WhatsApp actions
      'bulk_confirmations': '📱 Enviando confirmações: 12 pacientes amanhã, 8 quinta. Template: "Olá {nome}! Confirme sua consulta {data} às {hora}. Responda SIM."',
      'message_templates': '💬 Templates: Confirmação, Lembrete, Pós-consulta, Promoção, Reagendamento. Personalizados por tipo de procedimento.',
      'delivery_report': '📊 Entrega WhatsApp: 94% entregues, 89% lidos, 76% respondidos. Melhor horário envio: 9h-11h e 14h-16h.',
      'auto_replies': '🤖 Respostas automáticas: "Obrigado! Sua consulta está confirmada" (SIM), "Reagendamento disponível em..." (NÃO).',
      
      // Financial reconciliation actions
      'card_details': '💳 Detalhes cartão: Visa 45%, Master 35%, Elo 20%. Taxa média: 2,8%. Prazo recebimento: Débito D+1, Crédito D+30.',
      'bank_reconciliation': '🏦 Reconciliação: 11/12 transações batidas. Pendência: R$ 350 (PIX em processamento). Diferença: R$ 0,00.',
      'inconsistency_analysis': '📊 Análise: 99,2% precisão. Inconsistência mais comum: atraso PIX (3%), erro digitação valor (0,8%).',
      
      // Default actions
      'show_full_report': '📊 Relatório completo gerado! Dashboard com métricas principais, gráficos de tendência e insights acionáveis carregado.',
      'optimize_schedule': '📅 Otimização agenda: 3 horários realocados, +2 encaixes possíveis. Eficiência aumentou 12%. Receita potencial +R$ 800.'
    };

    if (action === 'create_patient_list') {
      // Add embedded patient list to chat
      const patientListMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        text: 'Aqui está a lista interativa dos pacientes que não retornaram desde abril. Você pode selecionar os pacientes e realizar ações em lote:',
        embeddedPatientList: inactivePatients,
        isNew: true
      };
      setMessages(prev => [...prev, patientListMessage]);
      setNewMessageIds(new Set([patientListMessage.id]));
      return;
    }

    // Handle other actions with responses
    const response = actionResponses[action] || `Ação "${action}" executada com sucesso!`;
    const responseMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      text: response,
      isNew: true
    };
    
    setMessages(prev => [...prev, responseMessage]);
    setNewMessageIds(new Set([responseMessage.id]));
  };

  const handleCheckIn = (pacienteId: number) => {
    setPacientesNaClinica(prev => 
      prev.map(paciente => 
        paciente.id === pacienteId 
          ? { ...paciente, checkedIn: true, checkInTime: new Date() }
          : paciente
      )
    );
    console.log('Check-in realizado para paciente ID:', pacienteId);
  };

  // Função para calcular tempo decorrido desde check-in
  const calcularTempoDesdeCheckIn = (checkInTime: Date | null): string => {
    if (!checkInTime) return "";
    
    const agora = new Date();
    const diferencaMs = agora.getTime() - checkInTime.getTime();
    const minutos = Math.floor(diferencaMs / (1000 * 60));
    
    if (minutos < 1) return "chegou agora";
    if (minutos === 1) return "1 min na clínica";
    return `${minutos} min na clínica`;
  };

  // Função para calcular tempo decorrido desde início da consulta
  const calcularTempoDesdeInicioConsulta = (inicioConsulta: Date | null): string => {
    if (!inicioConsulta) return "";
    
    const agora = new Date();
    const diferencaMs = agora.getTime() - inicioConsulta.getTime();
    const minutos = Math.floor(diferencaMs / (1000 * 60));
    
    if (minutos < 1) return "iniciando";
    if (minutos === 1) return "1 min em andamento";
    return `${minutos} min em andamento`;
  };

  // UseEffect para atualizar os tempos dinamicamente
  useEffect(() => {
    const interval = setInterval(() => {
      // Força re-render para atualizar os tempos calculados
      setPacientesNaClinica(prev => [...prev]);
      setConsultasNoConsultorio(prev => [...prev]);
    }, 30000); // Atualiza a cada 30 segundos para demonstração

    return () => clearInterval(interval);
  }, []);

  // --- Definição dos Dados da Jornada ---

  // Jornada de Profissionalização - Dados das Etapas
  const jornadaProfissionalizacao = {
    etapa1: {
      titulo: "Etapa 1: Fundações",
      subtitulo: "Onboarding de Dados e Regras",
      descricao: "Alimente o sistema com os dados essenciais para a operação dos agentes.",
      acoes: [
        {
          id: "migrar-pacientes",
          titulo: "Migrar Pacientes do Sistema Antigo",
          descricao: "Importe sua base de dados de pacientes para que a IA possa interagir com eles.",
          status: "pendente",
          icone: Database,
          persona: "Dentista/Gestor"
        },
        {
          id: "conectar-contas",
          titulo: "Conectar Contas Bancárias",
          descricao: "Integre suas contas para que o agente financeiro possa realizar a reconciliação.",
          status: "pendente",
          icone: CreditCard,
          persona: "Dentista/Gestor"
        },
        {
          id: "ativar-agente-agendamento",
          titulo: "Ativar Agente de Agendamento",
          descricao: "Defina as regras (horários, profissionais) para a IA agendar consultas via WhatsApp.",
          status: "pendente",
          icone: Calendar,
          persona: "Recepcionista"
        },
        {
          id: "cadastrar-paciente",
          titulo: "Cadastrar Novo Paciente",
          descricao: "Acelera a criação de um novo prontuário com os campos essenciais.",
          status: "concluido",
          icone: UserPlus,
          persona: "Recepcionista"
        }
      ]
    },
    etapa2: {
      titulo: "Etapa 2: Otimização do Atendimento",
      subtitulo: "Automação da Recepção",
      descricao: "Automatize tarefas repetitivas da recepção, liberando a equipe para focar no paciente.",
      acoes: [
        {
          id: "confirmar-consultas",
          titulo: "Confirmar Consultas do Dia",
          descricao: "Inicia um fluxo para enviar lembretes para os agendamentos das próximas 24h.",
          status: "pendente",
          icone: Clock,
          persona: "Recepcionista"
        },
        {
          id: "identificar-inativos",
          titulo: "Identificar Pacientes Inativos",
          descricao: "Gera uma lista de pacientes que não retornam há X meses para campanhas de reativação.",
          status: "pendente",
          icone: Users,
          persona: "Dentista/Gestor"
        },
        {
          id: "lancar-pagamento",
          titulo: "Lançar Pagamento (Check-out)",
          descricao: "Abre o modal para registrar o pagamento de um procedimento recém-realizado.",
          status: "concluido",
          icone: DollarSign,
          persona: "Recepcionista"
        },
        {
          id: "agendar-consulta",
          titulo: "Agendar Consulta",
          descricao: "Abre um modal para marcar um novo horário para um paciente.",
          status: "concluido",
          icone: Calendar,
          persona: "Recepcionista"
        }
      ]
    },
    etapa3: {
      titulo: "Etapa 3: Gestão Financeira Inteligente",
      subtitulo: "Automação Financeira",
      descricao: "Tenha visibilidade e automação sobre o fluxo de caixa e faturamento da clínica.",
      acoes: [
        {
          id: "configurar-reconciliacao",
          titulo: "Configurar Reconciliação Bancária",
          descricao: "Defina a cadência (diária, semanal) para o agente conferir recebimentos vs. agendamentos.",
          status: "pendente",
          icone: Zap,
          persona: "Dentista/Gestor"
        },
        {
          id: "analisar-faturamento",
          titulo: "Analisar Faturamento",
          descricao: "Exibe um dashboard simplificado com a performance financeira (mês atual vs. anterior).",
          status: "concluido",
          icone: BarChart3,
          persona: "Dentista/Gestor"
        }
      ]
    }
  };

  // Sugestões de ações e perguntas
  const actionSuggestions = [
    'Cadastre um novo paciente',
    'Fazer relatório de comissões',
    'Compre suprimentos da semana',
    'Cancele os agendamentos de sexta',
    'Agende uma consulta',
    'Envie um whatsapp',
    'Concilie as transações'
  ];

  const questionSuggestions = [
    'Como estão minhas vendas este mês?',
    'Quem não voltou desde abril?',
    'Qual o faturamento da semana passada?',
    'Quantos pacientes novos tivemos?',
  ];

  // Dados dos pacientes inativos (não voltaram desde abril)
  const inactivePatients = [
    {
      id: 1,
      name: 'Ana Beatriz Santos',
      lastVisit: '15/04/2024',
      phone: '(11) 98765-4321',
      email: 'ana.santos@email.com'
    },
    {
      id: 2,
      name: 'Roberto Lima',
      lastVisit: '08/04/2024',
      phone: '(11) 97654-3210',
      email: 'roberto.lima@email.com'
    },
    {
      id: 3,
      name: 'Fernanda Costa',
      lastVisit: '22/04/2024',
      phone: '(11) 96543-2109',
      email: 'fernanda.costa@email.com'
    },
    {
      id: 4,
      name: 'José Oliveira',
      lastVisit: '03/04/2024',
      phone: '(11) 95432-1098',
      email: 'jose.oliveira@email.com'
    },
    {
      id: 5,
      name: 'Mariana Souza',
      lastVisit: '29/04/2024',
      phone: '(11) 94321-0987',
      email: 'mariana.souza@email.com'
    },
    {
      id: 6,
      name: 'Pedro Almeida',
      lastVisit: '11/04/2024',
      phone: '(11) 93210-9876',
      email: 'pedro.almeida@email.com'
    }
  ];

  // Dados para as seções do dia
  const [pacientesNaClinica, setPacientesNaClinica] = useState<PacienteNaClinica[]>([
    {
      id: 1,
      paciente: "Maria Silva",
      procedimento: "Limpeza + Clareamento",
      horario: "14:30",
      duracao: "45 min",
      profissional: "Dr. Carlos",
      checkedIn: true, // já fez check-in
      checkInTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutos atrás
      tempo_restante: "15 min"
    },
    {
      id: 3,
      paciente: "Carlos Mendes",
      procedimento: "Consulta de rotina",
      horario: "15:30",
      duracao: "30 min",
      profissional: "Dr. Carlos",
      checkedIn: false, // ainda não fez check-in
      checkInTime: null,
      tempo_restante: "5 min"
    },
    {
      id: 4,
      paciente: "Ana Costa",
      procedimento: "Canal",
      horario: "16:30",
      duracao: "60 min",
      profissional: "Dr. Carlos",
      checkedIn: false, // ainda não fez check-in
      checkInTime: null,
      tempo_restante: "chegou agora"
    }
  ]);

  const [consultasNoConsultorio, setConsultasNoConsultorio] = useState<ConsultaNoConsultorio[]>([
    {
      id: 2,
      paciente: "João Santos",
      procedimento: "Extração de siso",
      horario: "15:00",
      duracao: "60 min",
      profissional: "Dra. Ana",
      status: "em-andamento",
      consultaIniciada: new Date(Date.now() - 45 * 60 * 1000), // 45 minutos atrás
      tempo_restante: "45 min"
    }
  ]);

  const agendamentosHoje = [
    { id: 1, paciente: "Carlos Oliveira", procedimento: "Consulta de rotina", horario: "16:00", status: "agendado" },
    { id: 2, paciente: "Ana Costa", procedimento: "Canal", horario: "16:30", status: "agendado" },
    { id: 3, paciente: "Pedro Lima", procedimento: "Prótese", horario: "17:00", status: "agendado" }
  ];

  const tarefasHoje = [
    { id: 1, titulo: "Revisar estoque de anestésicos", prioridade: "alta", concluida: false },
    { id: 2, titulo: "Confirmar consultas de amanhã", prioridade: "media", concluida: true },
    { id: 3, titulo: "Atualizar prontuário - Maria Silva", prioridade: "baixa", concluida: false },
    { id: 4, titulo: "Solicitar material para próxima semana", prioridade: "media", concluida: false }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Main Chat */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-4xl mx-auto relative">
        <div className="mb-4 text-center">
          <p className="text-gray-500 text-xl mb-4">Olá <b>Eric</b>, como posso te ajudar hoje?</p>
        </div>
        
        <div className="flex gap-2 mb-6 relative">
          <Tooltip text={tooltips.chatInput} className="flex-1 relative">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => handleChatMessageChange(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                showPatientSuggestions 
                  ? "Digite um nome... (Tab para preencher, Enter para abrir)" 
                  : chatState === 'suggestions' 
                    ? "Ex: Como estão minhas vendas este mês? Ou digite um nome de paciente..." 
                    : "Continue a conversa..."
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 relative z-50 w-full"
            />
            
            {/* Autocomplete de Pacientes */}
            {showPatientSuggestions && patientSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b">
                  Pacientes
                  <span className="float-right text-gray-400">
                    Tab para preencher • Enter para abrir
                  </span>
                </div>
                {patientSuggestions.map((patient, index) => (
                  <button
                    key={patient.id}
                    onClick={() => openPatientRecord(patient.id)}
                    className={`w-full text-left px-3 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                      index === selectedPatientIndex ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                    }`}
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{patient.name}</div>
                      {patient.email && (
                        <div className="text-xs text-gray-500">{patient.email}</div>
                      )}
                    </div>
                    {index === 0 && (
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">↵</kbd>
                        abrir
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </Tooltip>
          <button
            onClick={handleSendMessage}
            aria-label="Enviar mensagem"
            className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center relative z-50"
          >
            <Send className="w-5 h-5" />
          </button>
          
          {/* Modais Generativos - posicionados logo abaixo do input com z-index alto */}
          <GenerativeSchedulingModal
            isVisible={isGenerativeModalVisible}
            chatText={chatMessage}
            onChatTextChange={handleChatMessageChange}
            onClose={closeGenerativeModal}
            onSchedulingConfirmed={handleSchedulingConfirmed}
          />

          <GenerativePatientModal
            isVisible={isGenerativePatientModalVisible}
            chatText={chatMessage}
            onChatTextChange={handleChatMessageChange}
            onClose={closeGenerativePatientModal}
            onPatientCreated={handlePatientCreated}
          />
        </div>

        {/* Patient Modal */}
        <PatientModal isOpen={isPatientModalOpen} onClose={closePatientModal} />



        {/* Suggestion Pills - only show when in suggestions mode */}
        {chatState === 'suggestions' && (
          <div className="space-y-3 relative z-10">
            {/* Ações */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-4 h-4 text-green-600" />
                <Tooltip text={tooltips.acoesSuggestions}>
                  <span className="text-xs font-medium text-gray-600 border-b border-dotted border-gray-400 cursor-help">Ações</span>
                </Tooltip>
              </div>
              <div className="flex flex-wrap gap-2">
                {actionSuggestions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(action)}
                    className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full border border-green-200 hover:bg-green-200 transition-colors text-xs font-medium"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Perguntas */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-blue-600" />
                 <Tooltip text={tooltips.perguntasSuggestions}>
                  <span className="text-xs font-medium text-gray-600 border-b border-dotted border-gray-400 cursor-help">Perguntas</span>
                </Tooltip>
              </div>
              <div className="flex flex-wrap gap-2">
                {questionSuggestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-200 transition-colors text-xs font-medium"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay Bubble de Conversa - aparece flutuante igual ao ChatOverlay */}
      {chatState === 'conversation' && messages.length > 0 && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {/* Backdrop escuro com blur - tela toda */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm pointer-events-auto"
            onClick={handleClearChat}
          ></div>
          
          {/* Container centralizado para as mensagens - ajustado para área de conteúdo sem sidebar */}
          <div className="absolute top-32 left-64 right-0 flex justify-center pointer-events-none z-10 pt-8">
            <div className="w-[600px] max-h-[70vh] pointer-events-none">
              {/* Área de Mensagens */}
              <div className="space-y-4 pointer-events-auto overflow-y-auto max-h-[70vh] pr-2">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`w-full ${
                      newMessageIds.has(msg.id) 
                        ? 'animate-fade-slide-up' 
                        : ''
                    }`}
                  >
                    <div className={`max-w-[480px] px-5 py-4 rounded-xl shadow-lg backdrop-blur-sm ${
                      msg.type === 'user' 
                        ? 'bg-indigo-600/95 text-white rounded-br-sm ml-auto' 
                        : 'bg-white/95 text-gray-800 rounded-bl-sm border border-gray-200/50 mr-auto'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      
                      {/* Action Cards */}
                      {msg.actionCards && msg.actionCards.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.actionCards.map((card, index) => (
                            <button
                              key={index}
                              onClick={() => handleActionCardClick(card.action)}
                              className="w-full text-left px-3 py-2 bg-gray-50/90 backdrop-blur-sm text-gray-700 text-xs rounded-lg border border-gray-200/50 hover:bg-gray-100/90 transition-colors shadow-sm"
                            >
                              {card.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Embedded Patient List */}
                      {msg.embeddedPatientList && (
                        <EmbeddedPatientList patients={msg.embeddedPatientList} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Acontecendo Agora */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 rounded-lg p-2">
            <Activity className="w-5 h-5 text-red-600" />
          </div>
          <Tooltip text={tooltips.acontecendoAgora}>
            <h3 className="text-lg font-semibold text-gray-800 border-b border-dotted border-gray-400 cursor-help">Acontecendo Agora</h3>
          </Tooltip>
        </div>
        
        <div className="space-y-6">
          {/* Na Clínica */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h4 className="font-medium text-gray-700">Na Clínica</h4>
              <span className="text-xs text-gray-500">Check-in de pacientes em horário de consulta</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pacientesNaClinica.map((paciente) => (
                <div key={paciente.id} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{paciente.paciente}</h4>
                      <p className="text-sm text-gray-600">{paciente.procedimento}</p>
                      <p className="text-xs text-gray-500">{paciente.profissional}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-700">{paciente.horario}</p>
                      <p className="text-xs text-gray-500">{paciente.duracao}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        paciente.checkedIn ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-xs font-medium">
                        {paciente.checkedIn ? 'Check-in realizado' : 'Aguardando check-in'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">
                      {paciente.checkedIn 
                        ? calcularTempoDesdeCheckIn(paciente.checkInTime)
                        : paciente.tempo_restante
                      }
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200 space-y-2">
                    {/* Botão Check-in ou Iniciar Consulta */}
                    {!paciente.checkedIn ? (
                      <button 
                        onClick={() => handleCheckIn(paciente.id)}
                        className="w-full px-2 py-1.5 text-purple-700 border border-purple-200 rounded hover:bg-purple-50 transition-colors text-xs font-medium flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Check-in
                      </button>
                    ) : (
                      <button 
                        onClick={() => navigate('/consultation-mode')}
                        className="w-full px-2 py-1.5 text-green-700 border border-green-200 rounded hover:bg-green-50 transition-colors text-xs font-medium flex items-center justify-center gap-1.5"
                      >
                        <Video className="w-3 h-3" />
                        Iniciar consulta
                      </button>
                    )}
                    
                    {/* Botão Enviar Anamnese - sempre visível */}
                    <button 
                      onClick={() => console.log('Enviando anamnese para:', paciente.paciente)}
                      className="w-full px-2 py-1.5 text-indigo-700 border border-indigo-200 rounded hover:bg-indigo-50 transition-colors text-xs font-medium flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3 h-3" />
                      Anamnese
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No Consultório */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <h4 className="font-medium text-gray-700">No Consultório</h4>
              <span className="text-xs text-gray-500">Consultas em andamento</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consultasNoConsultorio.map((consulta) => (
                <div key={consulta.id} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{consulta.paciente}</h4>
                      <p className="text-sm text-gray-600">{consulta.procedimento}</p>
                      <p className="text-xs text-gray-500">{consulta.profissional}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-700">{consulta.horario}</p>
                      <p className="text-xs text-gray-500">{consulta.duracao}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-orange-700 font-medium">Em andamento</span>
                    </div>
                    <span className="text-xs text-gray-600">
                      {calcularTempoDesdeInicioConsulta(consulta.consultaIniciada)}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-orange-200">
                    <button 
                      onClick={() => console.log('Fazendo checkout do paciente:', consulta.paciente)}
                      className="w-full px-2 py-1.5 text-blue-700 border border-blue-200 rounded hover:bg-blue-50 transition-colors text-xs font-medium flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Checkout
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Seu Dia Hoje */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 rounded-lg p-2">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <Tooltip text={tooltips.seuDiaHoje}>
            <h3 className="text-lg font-semibold text-gray-800 border-b border-dotted border-gray-400 cursor-help">Seu Dia Hoje</h3>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agendamentos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-blue-600" />
              <h4 className="font-medium text-gray-700">Próximos Agendamentos</h4>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {agendamentosHoje.length}
              </span>
            </div>
            <div className="space-y-3">
              {agendamentosHoje.map((agendamento) => (
                <div key={agendamento.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{agendamento.paciente}</p>
                      <p className="text-sm text-gray-600">{agendamento.procedimento}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">{agendamento.horario}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <PhoneCall className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Lembrete enviado</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tarefas */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <h4 className="font-medium text-gray-700">Tarefas</h4>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {tarefasHoje.filter(t => !t.concluida).length} pendentes
              </span>
            </div>
            <div className="space-y-3">
              {tarefasHoje.map((tarefa) => (
                <div key={tarefa.id} className={`border rounded-lg p-3 transition-colors ${
                  tarefa.concluida 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center ${
                      tarefa.concluida 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {tarefa.concluida && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${tarefa.concluida ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                        {tarefa.titulo}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          tarefa.prioridade === 'alta' 
                            ? 'bg-red-100 text-red-700'
                            : tarefa.prioridade === 'media'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {tarefa.prioridade}
                        </span>
                        {!tarefa.concluida && (
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            Marcar como concluída
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Próximos Passos */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 rounded-lg p-2">
            <MapPin className="w-5 h-5 text-purple-600" />
          </div>
          <Tooltip text={tooltips.proximosPassos}>
            <h3 className="text-lg font-semibold text-gray-800 border-b border-dotted border-gray-400 cursor-help">Próximos Passos</h3>
          </Tooltip>
          <span className="text-sm text-gray-500">Sua jornada de automação</span>
        </div>

        {/* Jornada de Profissionalização */}
        <div className="space-y-8">
          {Object.values(jornadaProfissionalizacao).map((etapa, etapaIndex) => {
            const totalAcoes = etapa.acoes.length;
            const acoesConcluidas = etapa.acoes.filter(acao => acao.status === 'concluido').length;
            const progressoPorcentagem = (acoesConcluidas / totalAcoes) * 100;
            
            return (
              <div key={etapaIndex} className="border border-gray-200 rounded-lg p-6">
                {/* Cabeçalho da Etapa */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Tooltip text={
                        etapaIndex === 0 ? tooltips.etapa1Fundacoes :
                        etapaIndex === 1 ? tooltips.etapa2Otimizacao :
                        etapaIndex === 2 ? tooltips.etapa3GestaoFinanceira :
                        etapa.descricao
                      }>
                        <h4 className="text-lg font-semibold text-gray-800 border-b border-dotted border-gray-400 cursor-help">
                          {etapa.titulo}
                        </h4>
                      </Tooltip>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{etapa.subtitulo}</p>
                    <p className="text-sm text-gray-500">{etapa.descricao}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-medium text-gray-700">
                      {acoesConcluidas}/{totalAcoes} concluídas
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressoPorcentagem}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Ações da Etapa */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {etapa.acoes.map((acao) => {
                    const IconeAcao = acao.icone;
                    const isConcluida = acao.status === 'concluido';
                    
                    return (
                      <div 
                        key={acao.id}
                        className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                          isConcluida 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-gray-200 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            isConcluida 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-purple-100 text-purple-600'
                          }`}>
                            <IconeAcao className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className={`font-medium text-sm ${
                                isConcluida ? 'text-green-800' : 'text-gray-800'
                              }`}>
                                {acao.titulo}
                              </h5>
                              {isConcluida && (
                                <CheckCircle className="w-4 h-4 text-green-600 ml-2 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{acao.descricao}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{acao.persona}</span>
                              {!isConcluida && (
                                <button className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1">
                                  Iniciar
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumo do Progresso Geral */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-purple-800">Progresso Geral da Jornada</h4>
              <p className="text-sm text-purple-600">
                {Object.values(jornadaProfissionalizacao).reduce((total, etapa) => 
                  total + etapa.acoes.filter(acao => acao.status === 'concluido').length, 0
                )}/{Object.values(jornadaProfissionalizacao).reduce((total, etapa) => 
                  total + etapa.acoes.length, 0
                )} ações concluídas
              </p>
            </div>
            <div className="text-right">
              <div className="w-32 bg-purple-200 rounded-full h-3">
                <div 
                  className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(
                      Object.values(jornadaProfissionalizacao).reduce((total, etapa) => 
                        total + etapa.acoes.filter(acao => acao.status === 'concluido').length, 0
                      ) / Object.values(jornadaProfissionalizacao).reduce((total, etapa) => 
                        total + etapa.acoes.length, 0
                      )
                    ) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage; 