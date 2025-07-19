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
} from 'lucide-react';
import PatientModal from '../components/PatientModal';
import GenerativeSchedulingModal from '../components/GenerativeSchedulingModal';
import GenerativePatientModal from '../components/GenerativePatientModal';
import Tooltip from '../components/Tooltip';
import { tooltips } from '../data/tooltips';

// --- Tipos e Dados da Jornada de Profissionalização ---

type Message = {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  actionCards?: { label: string; action: string }[];
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

  const getActionCards = (): { label: string; action: string }[] => {
    const cards = [
      { label: '📊 Ver relatório completo', action: 'show_full_report' },
      { label: '👥 Listar pacientes inativos', action: 'list_inactive_patients' },
      { label: '📅 Otimizar agenda', action: 'optimize_schedule' },
      { label: '💰 Analisar faturamento', action: 'analyze_revenue' },
    ];
    
    // Return random 2-3 cards
    const shuffled = cards.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Check for generative modal triggers first
      const isSchedulingAttempt = chatMessage.toLowerCase().startsWith('agendar');
      const isPatientCreationAttempt = chatMessage.toLowerCase().startsWith('cadastrar paciente');
      
      if (isSchedulingAttempt || isPatientCreationAttempt) {
        // Handle generative modals as before
        setIsGenerativeModalVisible(isSchedulingAttempt);
        setIsGenerativePatientModalVisible(isPatientCreationAttempt);
        if (isPatientCreationAttempt) {
          setIsGenerativeModalVisible(false);
        }
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
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleChatMessageChange = (message: string) => {
    setChatMessage(message);
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
          actionCards: getActionCards(),
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
        
        <div className="flex gap-2 mb-6">
          <Tooltip text={tooltips.chatInput} className="flex-1">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => handleChatMessageChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={chatState === 'suggestions' ? "Ex: Como estão minhas vendas este mês?" : "Continue a conversa..."}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 relative z-50"
            />
          </Tooltip>
          <button
            onClick={handleSendMessage}
            aria-label="Enviar mensagem"
            className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center relative z-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Generativo de Agendamento */}
        {/* Ensure correct props are used for deployment */}
        <GenerativeSchedulingModal
          isVisible={isGenerativeModalVisible}
          chatText={chatMessage}
          onChatTextChange={handleChatMessageChange}
          onClose={closeGenerativeModal}
          onSchedulingConfirmed={handleSchedulingConfirmed}
        />

        {/* Patient Modal */}
        <PatientModal isOpen={isPatientModalOpen} onClose={closePatientModal} />

        {/* Patient Creation Modal */}
        <GenerativePatientModal
          isVisible={isGenerativePatientModalVisible}
          chatText={chatMessage}
          onChatTextChange={handleChatMessageChange}
          onClose={closeGenerativePatientModal}
          onPatientCreated={handlePatientCreated}
        />

        {/* Suggestion Pills - only show when in suggestions mode */}
        {chatState === 'suggestions' && (
          <div className="space-y-3 relative z-50">
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
                              onClick={() => console.log('Action:', card.action)}
                              className="w-full text-left px-3 py-2 bg-gray-50/90 backdrop-blur-sm text-gray-700 text-xs rounded-lg border border-gray-200/50 hover:bg-gray-100/90 transition-colors shadow-sm"
                            >
                              {card.label}
                            </button>
                          ))}
                        </div>
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