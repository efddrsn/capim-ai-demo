import React, { useState, useEffect } from 'react';
import { Send, Zap, MessageCircle, BarChart3 } from 'lucide-react';
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

const ChatOverlay: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatState, setChatState] = useState<ChatState>('suggestions');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageIds, setNewMessageIds] = useState<Set<string>>(new Set());
  const location = useLocation();

  // Remove animation class after animation completes
  useEffect(() => {
    if (newMessageIds.size > 0) {
      const timer = setTimeout(() => {
        setNewMessageIds(new Set());
      }, 600); // Animation duration + small buffer
      return () => clearTimeout(timer);
    }
  }, [newMessageIds]);

  const getAIResponse = (pathname: string): string => {
    // Simulação de respostas contextuais baseadas na página
    const responses: { [key: string]: string[] } = {
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
    // Simulação de action cards contextuais
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
      
      // Muda para modo conversação e adiciona mensagem do usuário
      setChatState('conversation');
      setMessages(prev => [...prev, userMessage]);
      setNewMessageIds(new Set([userMessage.id]));
      setMessage('');
      
      // Simula resposta da IA após delay
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
    // Envia a mensagem automaticamente
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: suggestion.text,
        isNew: true
      };
      
      setChatState('conversation');
      setMessages(prev => [...prev, userMessage]);
      setNewMessageIds(new Set([userMessage.id]));
      setMessage('');
      
      // Simula resposta da IA após delay
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
    }, 100);
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

  // Don't show chat bar on home page
  if (location.pathname === '/') {
    return null;
  }

  // Obter sugestões contextuais para a página atual
  const contextualSuggestions = getPrioritizedSuggestions(location.pathname, 3);

  return (
    <>
      {/* Barra de Chat Principal - sempre fixa */}
      <div className="bg-white border-b border-gray-200 shadow-sm mb-6">
        {/* Barra de Chat */}
        <div className="flex items-center justify-center px-6 py-3">
          {/* Chat Input - perfeitamente centralizado */}
          <div className="flex gap-3 w-[825px]">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={chatState === 'suggestions' ? "Digite sua mensagem ou clique em uma sugestão..." : "Continue a conversa..."}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white z-50 relative"
            />
            <button
              onClick={handleSendMessage}
              title="Enviar mensagem"
              className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2 z-50 relative"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sugestões Contextuais - só aparecem no modo suggestions */}
        {chatState === 'suggestions' && contextualSuggestions.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {contextualSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors flex items-center gap-1.5 ${getCategoryColor(suggestion.category)}`}
                  title={`Categoria: ${suggestion.category === 'acao' ? 'Ação' : suggestion.category === 'pergunta' ? 'Pergunta' : 'Análise'}`}
                >
                  {getCategoryIcon(suggestion.category)}
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlay Bubble de Conversa - aparece flutuante */}
      {chatState === 'conversation' && messages.length > 0 && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {/* Backdrop escuro com blur - tela toda */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm pointer-events-auto"
            onClick={handleClearChat}
          ></div>
          
          {/* Container centralizado para as mensagens - ajustado para área de conteúdo */}
          <div className="absolute top-20 left-64 right-0 flex justify-center pointer-events-none z-10 pt-8">
            <div className="w-[600px] max-h-[75vh] pointer-events-none">
            {/* Área de Mensagens - sem background */}
            <div className="space-y-4 pointer-events-auto">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`w-full ${
                    newMessageIds.has(msg.id) 
                      ? 'animate-fade-slide-up' 
                      : ''
                  }`}
                >
                  <div className={`max-w-[400px] px-5 py-4 rounded-xl shadow-lg backdrop-blur-sm ${
                    msg.type === 'user' 
                      ? 'bg-purple-600/95 text-white rounded-br-sm ml-auto' 
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
    </>
  );
};

export default ChatOverlay; 