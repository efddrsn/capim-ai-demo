import React, { useState, useEffect } from 'react';
import { Send, Zap, MessageCircle, BarChart3, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getPrioritizedSuggestions } from '../data/contextualSuggestions';
import type { ContextualSuggestion } from '../data/contextualSuggestions';

type ChatState = 'suggestions' | 'conversation';
type Message = {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  actionCards?: { label: string; action: string }[];
  isNew?: boolean;
};

const AIChatPanel: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatState, setChatState] = useState<ChatState>('suggestions');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageIds, setNewMessageIds] = useState<Set<string>>(new Set());
  const location = useLocation();

  useEffect(() => {
    if (newMessageIds.size > 0) {
      const timer = setTimeout(() => {
        setNewMessageIds(new Set());
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [newMessageIds]);

  const getContextLabel = () => {
    const pathMap: { [key: string]: string } = {
      '/': 'Home',
      '/agenda': 'Agenda',
      '/pacientes': 'Pacientes', 
      '/financeiro': 'Financeiro',
      '/estoque': 'Estoque',
      '/comunicacao': 'Comunicação',
      '/relatorios': 'Relatórios',
    };
    
    const context = pathMap[location.pathname];
    return context ? `${context}` : 'CAPIM';
  };

  const getAIResponse = (pathname: string): string => {
    const responses: { [key: string]: string[] } = {
      '/': [
        'Analisei seus dados e identifiquei 3 oportunidades de melhoria na clínica.',
        'Baseado no histórico, recomendo focar na reativação de pacientes este mês.',
        'Sua performance geral está 15% acima da média. Quer ver os detalhes?'
      ],
      '/agenda': [
        'Analisei sua agenda e encontrei 3 horários disponíveis para esta semana.',
        'Identifiquei um conflito de horários para quinta-feira às 14h.',
        'Sua taxa de ocupação esta semana está em 85%, muito boa!'
      ],
      '/pacientes': [
        'Encontrei 12 pacientes que não retornam há mais de 3 meses.',
        'O perfil dos seus pacientes mostra 60% mulheres, idade média 35 anos.',
        'Identifiquei 5 pacientes com histórico de faltas recorrentes.'
      ],
      '/financeiro': [
        'Seu faturamento este mês está 15% acima do mês anterior.',
        'Identifiquei R$ 2.340 em pagamentos pendentes dos últimos 30 dias.',
        'A análise de fluxo de caixa indica necessidade de provisão para dezembro.'
      ],
      '/relatorios': [
        'Gerei um relatório comparativo que mostra crescimento de 12% no trimestre.',
        'Os dados indicam que terça-feira é seu dia mais produtivo.',
        'Identifiquei uma tendência de queda na retenção de pacientes novos.'
      ]
    };
    
    const pageResponses = responses[pathname] || ['Entendi sua solicitação. Como posso ajudar?'];
    return pageResponses[Math.floor(Math.random() * pageResponses.length)];
  };

  const getActionCards = (pathname: string): { label: string; action: string }[] => {
    const cards: { [key: string]: { label: string; action: string }[] } = {
      '/agenda': [
        { label: '📅 Ver horários livres', action: 'show_available_slots' },
        { label: '🔄 Reagendar conflito', action: 'reschedule_conflict' }
      ],
      '/pacientes': [
        { label: '📋 Ver lista completa', action: 'show_patient_list' },
        { label: '📱 Enviar campanha', action: 'send_campaign' }
      ],
      '/financeiro': [
        { label: '📊 Gerar relatório', action: 'generate_report' },
        { label: '💰 Lançar pagamento', action: 'record_payment' }
      ],
      '/relatorios': [
        { label: '📈 Ver detalhes', action: 'show_details' },
        { label: '📄 Exportar PDF', action: 'export_pdf' }
      ]
    };
    
    return cards[pathname] || [];
  };

  const handleClearChat = () => {
    setChatState('suggestions');
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: message.trim(),
        isNew: true
      };
      
      setChatState('conversation');
      setMessages(prev => [...prev, userMessage]);
      setNewMessageIds(new Set([userMessage.id]));
      setMessage('');
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          text: getAIResponse(location.pathname),
          actionCards: getActionCards(location.pathname),
          isNew: true
        };
        setMessages(prev => [...prev, aiResponse]);
        setNewMessageIds(new Set([aiResponse.id]));
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: ContextualSuggestion) => {
    setMessage(suggestion.text);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'acao':
        return <Zap className="w-3 h-3" />;
      case 'pergunta':
        return <MessageCircle className="w-3 h-3" />;
      case 'analise':
        return <BarChart3 className="w-3 h-3" />;
      default:
        return <MessageCircle className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'acao':
        return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200';
      case 'pergunta':
        return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200';
      case 'analise':
        return 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200';
    }
  };

  // Obter sugestões contextuais para a página atual
  const contextualSuggestions = getPrioritizedSuggestions(location.pathname, 6);

  // AI Action suggestions quando não está em modo chat
  const getAIActionSuggestions = () => {
    const actionsByPage: { [key: string]: Array<{ icon: string; observation: string; action: string; actionButton: string }> } = {
      '/': [
        { icon: '🏥', observation: 'Seu faturamento está 15% acima do mês anterior, mas a taxa de retenção caiu 8%.', action: 'Analisar quais pacientes não estão retornando', actionButton: 'Ver Análise Completa' },
        { icon: '👥', observation: 'Identifiquei 12 pacientes que não retornam há mais de 3 meses.', action: 'Criar campanha de reativação personalizada', actionButton: 'Iniciar Campanha' },
        { icon: '💰', observation: 'Dezembro historicamente tem queda de 20% no faturamento.', action: 'Gerar projeção e plano de ação preventivo', actionButton: 'Ver Projeção' },
      ],
      '/agenda': [
        { icon: '📅', observation: 'Você tem 40% dos horários livres nesta semana.', action: 'Criar campanha no CRM para pacientes em atraso', actionButton: 'Criar Campanha' },
        { icon: '⏰', observation: 'Terças-feiras têm 35% mais cancelamentos que outros dias.', action: 'Configurar lembretes especiais para terças', actionButton: 'Configurar Lembretes' },
        { icon: '🔄', observation: 'Pacientes sem lembrete têm 60% mais chance de faltar.', action: 'Ativar lembretes automáticos via WhatsApp', actionButton: 'Ativar Lembretes' },
      ],
      '/pacientes': [
        { icon: '🔍', observation: 'Seus pacientes VIP (>R$ 2.000) representam apenas 8% da base.', action: 'Identificar pacientes com potencial para upgrade', actionButton: 'Segmentar Pacientes' },
        { icon: '📊', observation: 'Pacientes mulheres entre 25-35 anos têm maior lifetime value.', action: 'Focar aquisição neste perfil específico', actionButton: 'Ver Estratégia' },
        { icon: '🎯', observation: 'João Santos não retorna há 4 meses e tem histórico de R$ 3.200.', action: 'Enviar campanha personalizada de reativação', actionButton: 'Enviar Campanha' },
      ],
      '/financeiro': [
        { icon: '📈', observation: 'Clareamentos geram 40% mais margem que outros procedimentos.', action: 'Criar promoção focada em clareamentos', actionButton: 'Criar Promoção' },
        { icon: '⚠️', observation: 'R$ 2.340 em pagamentos pendentes dos últimos 30 dias.', action: 'Iniciar fluxo de cobrança automatizada', actionButton: 'Iniciar Cobrança' },
        { icon: '🤖', observation: 'Cobrança manual consome 3h/semana da sua equipe.', action: 'Automatizar follow-up de pagamentos via IA', actionButton: 'Automatizar' },
      ],
      '/relatorios': [
        { icon: '📊', observation: 'Faturamento cresceu 12% mas o número de pacientes caiu 5%.', action: 'Analisar aumento do ticket médio por procedimento', actionButton: 'Ver Análise' },
        { icon: '📈', observation: 'Terças-feiras são 25% mais produtivas que segundas.', action: 'Otimizar agenda para maximizar terças', actionButton: 'Otimizar Agenda' },
        { icon: '📉', observation: 'Taxa de retenção de pacientes novos está em 65%.', action: 'Implementar programa de fidelização', actionButton: 'Criar Programa' },
      ]
    };
    
    return actionsByPage[location.pathname] || actionsByPage['/'];
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">IA Assistant</h3>
          <p className="text-xs text-gray-500">Contexto: {getContextLabel()}</p>
        </div>
        {chatState === 'conversation' && (
          <button
            onClick={handleClearChat}
            title="Voltar para sugestões"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content Area - Chat History OR AI Action Suggestions */}
      <div className="flex-1 overflow-y-auto p-4">
        {chatState === 'conversation' ? (
          /* Chat History */
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`${msg.type === 'user' ? 'ml-4' : 'mr-4'} ${
                  newMessageIds.has(msg.id) 
                    ? 'animate-fade-slide-up' 
                    : ''
                }`}
              >
                <div className={`p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-purple-100 text-purple-800 ml-auto max-w-[80%]'
                    : 'bg-gray-100 text-gray-800 max-w-[90%]'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  {msg.actionCards && msg.actionCards.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {msg.actionCards.map((card, index) => (
                        <button
                          key={index}
                          className="block w-full text-left p-2 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
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
        ) : (
                     /* AI Action Suggestions */
           <div className="space-y-4">
             <h4 className="text-sm font-medium text-gray-700 mb-3">Sugestões Inteligentes</h4>
             {getAIActionSuggestions().map((suggestion, index) => (
               <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                 <div className="flex items-start gap-3 mb-3">
                   <span className="text-lg">{suggestion.icon}</span>
                   <div className="flex-1">
                     <p className="text-sm text-gray-800 leading-relaxed">{suggestion.observation}</p>
                   </div>
                 </div>
                 <div className="ml-8">
                   <p className="text-xs text-gray-600 mb-2">💡 <strong>Ação:</strong> {suggestion.action}</p>
                   <button className="px-3 py-1.5 bg-purple-600 text-white text-xs rounded-md hover:bg-purple-700 transition-colors">
                     {suggestion.actionButton}
                   </button>
                 </div>
               </div>
             ))}
           </div>
        )}
      </div>

      {/* Sugestões (Pills) */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2 mb-3">
          {contextualSuggestions.slice(0, 4).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`inline-flex items-center gap-1 px-3 py-1 text-xs border rounded-full transition-colors ${getCategoryColor(suggestion.category)}`}
            >
              {getCategoryIcon(suggestion.category)}
              <span className="truncate max-w-[120px]">{suggestion.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input (na parte inferior) */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={chatState === 'suggestions' ? "Digite sua pergunta..." : "Continue a conversa..."}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            title="Enviar mensagem"
            className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel; 