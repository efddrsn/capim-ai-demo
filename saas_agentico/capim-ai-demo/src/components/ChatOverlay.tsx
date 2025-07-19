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

  const getAIResponse = (pathname: string, userMessage?: string): string => {
    // Respostas específicas baseadas no texto da mensagem do usuário
    if (userMessage) {
      const messageResponses: { [key: string]: string } = {
        // Home
        'Como estão minhas vendas este mês?': 'Analisei suas vendas e o faturamento está 15% acima do mês anterior! Foram R$ 28.500 contra R$ 24.780 em novembro. O destaque foi o aumento em procedimentos estéticos.',
        'Cadastre um novo paciente': 'Perfeito! Vou abrir o formulário de cadastro. Preciso dos dados básicos: nome completo, telefone, e-mail e data de nascimento. Tem alguma informação específica sobre este paciente?',
        'Agende uma consulta': 'Vou ajudar com o agendamento! Para qual paciente gostaria de agendar? Temos horários disponíveis hoje às 16h, amanhã às 9h e 14h30.',

        // Agenda
        'Remarque a consulta de Maria para próxima semana': 'Encontrei a consulta da Maria Silva agendada para hoje às 14h. Os horários disponíveis na próxima semana são: Segunda 10h, Terça 14h30, ou Quinta 9h. Qual prefere?',
        'Ver meus horários livres nesta semana': 'Esta semana você tem os seguintes horários disponíveis: Hoje às 16h, Amanhã às 9h e 15h30, Quinta às 10h e 14h, Sexta às 8h30 e 16h30.',
        'Encontrar próximo slot disponível para João': 'O João Santos tem preferência por manhãs. O próximo slot ideal seria amanhã às 9h ou quinta-feira às 10h. Ambos encaixam no perfil dele.',
        'Transformar esta consulta em retorno recorrente': 'Ótima ideia! Vou configurar retornos mensais. Baseado no histórico, sugiro agendamentos sempre na mesma semana do mês, mesmo horário. Confirma?',
        'Criar agendamento para limpeza na terça às 14h': 'Agendamento criado para limpeza/profilaxia na terça-feira às 14h. Paciente preferido para este horário? Vou enviar lembretes automáticos.',

        // Pacientes
        'Quem não voltou desde abril?': 'Encontrei 23 pacientes que não retornam desde abril. Os principais são: Maria Costa (última consulta 15/04), João Silva (22/04), Ana Santos (28/04). Todos têm histórico de tratamentos importantes.',
        'Cadastrar novo paciente com dados básicos': 'Formulário pronto! Preencha: Nome, telefone, e-mail, data de nascimento, endereço e como nos conheceu. Alguma observação especial sobre alergias ou condições médicas?',
        'Atualizar dados de contato da Maria Silva': 'Localizei Maria Silva no sistema. Dados atuais: (11) 99999-1234, maria@email.com. Quais informações precisa atualizar? Telefone, e-mail ou endereço?',
        'Listar pacientes inativos dos últimos 6 meses': 'Identifiquei 45 pacientes inativos desde junho. Perfil: 62% mulheres, idade média 38 anos, ticket médio histórico R$ 420. 18 deles tinham tratamentos pendentes.',
        'Enviar lembrete de retorno para pacientes em atraso': 'Campanha criada! 32 pacientes receberão WhatsApp personalizado lembrando do retorno. Histórico mostra 40% de taxa de resposta para este tipo de campanha.',

        // Orçamentos
        'Criar orçamento para implante + coroa da Maria': 'Orçamento gerado: Implante R$ 2.800 + Coroa de porcelana R$ 1.200 = Total R$ 4.000. Parcelamento disponível em até 12x. Maria tem preferência por qual forma de pagamento?',
        'Quais orçamentos estão próximos do vencimento?': 'Encontrei 8 orçamentos vencendo em 15 dias: João Santos (R$ 3.200) vence em 12 dias, Ana Costa (R$ 1.500) em 8 dias. Envio lembretes automáticos?',
        'Aprovar orçamento de R$ 3.200 do João Santos': 'Orçamento aprovado! João Santos - Tratamento ortodôntico R$ 3.200. Forma de pagamento: 8x R$ 400. Primeira sessão agendada para próxima terça às 14h.',
        'Analisar taxa de conversão por procedimento': 'Análise concluída: Clareamentos 85% conversão, Implantes 65%, Ortodontia 72%. Procedimentos estéticos têm maior aceitação. Quer ver detalhes por período?',
        'Enviar lembrete sobre orçamento pendente': 'Mensagem enviada para 15 pacientes com orçamentos pendentes. Template personalizado por tipo de procedimento. Acompanho as respostas e te informo.',

        // Financeiro
        'Conciliar transações bancárias do dia': 'Conciliação completa! 12 transações processadas: R$ 2.450 recebidos (8 consultas + 4 procedimentos). Divergência de R$ 0,00. Tudo bateu perfeitamente!',
        'Qual o faturamento da semana passada?': 'Semana passada: R$ 12.350 faturados. Crescimento de 8% vs semana anterior. Destaque para ortodontia (R$ 4.200) e clareamentos (R$ 2.800).',
        'Registrar pagamento de R$ 350 da consulta de João': 'Pagamento registrado! João Santos - R$ 350,00 recebido via PIX hoje às 14h32. Recibo gerado automaticamente e enviado por WhatsApp.',
        'Gerar relatório de inadimplentes': 'Relatório gerado: 12 pacientes em atraso, total R$ 5.890. Maiores valores: Maria Costa R$ 1.200 (45 dias), João Silva R$ 890 (30 dias). Iniciar cobrança?',
        'Emitir recibo para o pagamento de Maria': 'Recibo #001234 emitido para Maria Silva - R$ 450,00 consulta + limpeza, pago via cartão. Enviado por e-mail e WhatsApp.',

        // Estoque
        'Repor anestésicos - estoque baixo': 'Alerta confirmado! Lidocaína 2%: 3 tubetes restantes (mínimo 20). Pedido automático gerado para fornecedor habitual. Entrega prevista: 2 dias úteis.',
        'Quais itens estão com estoque baixo?': 'Itens críticos: Anestésicos (3 unidades), Luvas M (1 caixa), Algodão (15%), Sugador descartável (12 unidades). Gero pedido automático?',
        'Gerar pedido de compra para fornecedor': 'Pedido #PC-2024-089 gerado: Anestésicos 50 tubetes, Luvas M 10 caixas, Algodão 5kg. Total: R$ 890,00. Enviado para Dental Supply Ltda.',
        'Atualizar quantidade de luvas em estoque': 'Luvas atualizadas: P (8 caixas), M (2 caixas - baixo!), G (5 caixas). Entrada: 15/12 - 20 caixas M. Saída média: 1,5 caixa/semana.',
        'Sugerir quantidades ideais para próximo pedido': 'Baseado no consumo: Anestésicos 60 tubetes (2 meses), Luvas 15 caixas, Algodão 8kg. Investimento: R$ 1.240 para 60 dias de estoque.',

        // Comunicação
        'Enviar WhatsApp para confirmar consultas de amanhã': 'Mensagens enviadas para 8 pacientes! Modelo: "Olá [Nome], confirmando sua consulta amanhã às [hora]. Responda SIM para confirmar." Taxa de resposta média: 95%.',
        'Criar campanha de reativação para inativos': 'Campanha "Volta ao Sorriso" criada! 45 pacientes inativos receberão mensagem personalizada com desconto especial. Histórico: 25% taxa de retorno.',
        'Agendar follow-up pós-tratamento para Ana': 'Follow-up agendado! Ana Santos - controle pós-clareamento em 15 dias. Lembrete automático ativado. Sucesso do tratamento: acompanhamento aumenta satisfação em 40%.',
        'Configurar lembrete automático de consultas': 'Lembretes configurados: 24h antes (WhatsApp), 2h antes (SMS de segurança). Taxa de faltas reduz de 15% para 3% com este sistema.',
        'Enviar pesquisa de satisfação para pacientes': 'Pesquisa enviada para 25 pacientes dos últimos 15 dias. Link personalizado, 3 perguntas rápidas. Meta: 80% resposta (atual: 72%).',

        // Relatórios
        'Explicar por que o faturamento caiu 15% este mês': 'Análise da queda: 40% devido a menor volume de procedimentos estéticos (sazonalidade dezembro), 35% cancelamentos por questões financeiras de fim de ano, 25% menos pacientes novos.',
        'Quantos pacientes novos tivemos?': 'Dezembro: 18 pacientes novos (vs 25 em novembro). Origem: 8 indicações, 6 redes sociais, 4 busca online. Conversão de orçamento: 78% (acima da média).',
        'Quebrar faturamento por procedimento': 'Breakdown dezembro: Ortodontia R$ 8.400 (35%), Clareamentos R$ 4.200 (18%), Implantes R$ 6.300 (26%), Consultoria R$ 2.900 (12%), Outros R$ 2.200 (9%).',
        'Gerar relatório de performance do mês': 'Performance dezembro: Faturamento R$ 24.000, 95 atendimentos, ticket médio R$ 252. Pontos fortes: retenção 88%. Melhorar: aquisição de pacientes novos.',
        'Exportar dados para contabilidade': 'Relatório contábil exportado: faturamento, despesas, impostos, pagamentos. Arquivo Excel enviado para contador@email.com. Inclui DRE preliminar.',

        // Contábil
        'Gerar DAS de dezembro e lembrar vencimento': 'DAS dezembro: R$ 890,45 (6% sobre R$ 14.841). Vencimento: 20/01/2025. Lembrete configurado para 15/01. Valor 8% menor que novembro.',
        'Organizar documentos para envio ao contador': 'Documentos organizados: 45 notas fiscais, extratos bancários, recibos de despesas. Pasta digital criada e enviada para contador@empresa.com.',
        'Qual o valor total de impostos pagos este ano?': 'Impostos 2024: R$ 12.450 (DAS Simples), R$ 3.200 (outros tributos) = Total R$ 15.650. Representa 8,2% do faturamento bruto anual.',
        'Verificar próximos vencimentos fiscais': 'Próximos vencimentos: DAS janeiro (20/01), DCTF (15/02), Declaração anual (31/05). Valores estimados: R$ 920, R$ 0, taxa fixa R$ 150.',
        'Exportar relatório para declaração anual': 'Relatório DASN-SIMEI exportado: faturamento anual R$ 191.000, impostos pagos R$ 15.650. Arquivo pronto para declaração até 31/05/2025.'
      };

      // Procura por uma resposta específica baseada no texto exato
      if (messageResponses[userMessage]) {
        return messageResponses[userMessage];
      }

      // Se não encontrar resposta específica, tenta match parcial por palavras-chave
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('vendas') || lowerMessage.includes('faturamento')) {
        return 'Analisei seu faturamento e identifiquei tendências importantes. Este mês está 15% acima do anterior. Quer ver os detalhes por procedimento?';
      }
      
      if (lowerMessage.includes('paciente') && lowerMessage.includes('cadastr')) {
        return 'Vou ajudar com o cadastro! Preciso dos dados básicos: nome, telefone, e-mail e data de nascimento. Tem alguma informação específica sobre este paciente?';
      }
      
      if (lowerMessage.includes('agenda') || lowerMessage.includes('consulta')) {
        return 'Vou verificar sua agenda. Temos horários disponíveis hoje às 16h, amanhã às 9h e 14h30. Para qual paciente gostaria de agendar?';
      }
      
      if (lowerMessage.includes('horário') && lowerMessage.includes('livre')) {
        return 'Esta semana você tem horários livres: Hoje às 16h, Amanhã às 9h e 15h30, Quinta às 10h e 14h, Sexta às 8h30 e 16h30.';
      }
      
      if (lowerMessage.includes('estoque') && lowerMessage.includes('baixo')) {
        return 'Itens com estoque baixo: Anestésicos (3 unidades), Luvas M (1 caixa), Algodão (15%). Gero pedido automático para reposição?';
      }
      
      if (lowerMessage.includes('pagamento') || lowerMessage.includes('financeiro')) {
        return 'Analisei sua situação financeira. Temos R$ 2.340 em pagamentos pendentes dos últimos 30 dias. Quer que inicie o processo de cobrança?';
      }
      
      if (lowerMessage.includes('relatório') || lowerMessage.includes('análise')) {
        return 'Gerei uma análise completa dos seus dados. O crescimento trimestral está em 12%, mas identifiquei oportunidades de melhoria na retenção.';
      }
    }

    // Fallback para respostas contextuais por página se não houver match específico
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
      '/orcamentos': [
        'Identifiquei 8 orçamentos próximos do vencimento nos próximos 15 dias.',
        'Sua taxa de conversão de orçamentos está em 72% este mês.',
        'Procedimentos estéticos têm maior aceitação que tratamentos corretivos.'
      ],
      '/financeiro': [
        'Seu faturamento este mês está 15% acima do mês anterior.',
        'Identifiquei R$ 2.340 em pagamentos pendentes dos últimos 30 dias.',
        'A análise de fluxo de caixa indica necessidade de provisão para dezembro.'
      ],
      '/estoque': [
        'Identifiquei 3 itens com estoque crítico: anestésicos, luvas M e algodão.',
        'Seu padrão de consumo sugere reposição semanal de materiais básicos.',
        'Fornecedor principal tem prazo de entrega de 2 dias úteis.'
      ],
      '/comunicacao': [
        'Taxa de resposta dos lembretes via WhatsApp está em 95%.',
        'Campanhas de reativação têm retorno médio de 25% dos pacientes.',
        'Pesquisas de satisfação mostram NPS de 8.5/10.'
      ],
      '/relatorios': [
        'Gerei um relatório comparativo que mostra crescimento de 12% no trimestre.',
        'Os dados indicam que terça-feira é seu dia mais produtivo.',
        'Identifiquei uma tendência de queda na retenção de pacientes novos.'
      ],
      '/contabil': [
        'DAS de dezembro: R$ 890,45 com vencimento em 20/01/2025.',
        'Impostos anuais totalizam R$ 15.650 (8,2% do faturamento).',
        'Próximos vencimentos: DAS janeiro, DCTF fevereiro, Declaração maio.'
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
      '/orcamentos': [
        { label: '💰 Criar orçamento', action: 'create_budget' },
        { label: '⏰ Ver vencimentos', action: 'check_expiring' }
      ],
      '/financeiro': [
        { label: '📊 Gerar relatório', action: 'generate_report' },
        { label: '💰 Lançar pagamento', action: 'record_payment' }
      ],
      '/estoque': [
        { label: '📦 Gerar pedido', action: 'create_order' },
        { label: '⚠️ Ver críticos', action: 'check_critical' }
      ],
      '/comunicacao': [
        { label: '📱 Enviar WhatsApp', action: 'send_whatsapp' },
        { label: '📋 Criar campanha', action: 'create_campaign' }
      ],
      '/relatorios': [
        { label: '📈 Ver detalhes', action: 'show_details' },
        { label: '📄 Exportar PDF', action: 'export_pdf' }
      ],
      '/contabil': [
        { label: '🧾 Gerar DAS', action: 'generate_das' },
        { label: '📅 Ver vencimentos', action: 'check_deadlines' }
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
          text: getAIResponse(location.pathname, userMessage.text),
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
          text: getAIResponse(location.pathname, userMessage.text),
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
        <div className="flex items-center justify-center px-4 lg:px-6 py-3">
          {/* Chat Input - responsivo */}
          <div className="flex gap-2 lg:gap-3 w-full max-w-4xl lg:w-[825px]">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={chatState === 'suggestions' ? "Digite sua mensagem..." : "Continue a conversa..."}
              className="flex-1 px-3 lg:px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white z-50 relative"
            />
            <button
              onClick={handleSendMessage}
              title="Enviar mensagem"
              className="px-3 lg:px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2 z-50 relative"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sugestões Contextuais - só aparecem no modo suggestions */}
        {chatState === 'suggestions' && contextualSuggestions.length > 0 && (
          <div className="px-4 lg:px-6 py-3 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {contextualSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors flex items-center gap-1.5 ${getCategoryColor(suggestion.category)}`}
                  title={`Categoria: ${suggestion.category === 'acao' ? 'Ação' : suggestion.category === 'pergunta' ? 'Pergunta' : 'Análise'}`}
                >
                  {getCategoryIcon(suggestion.category)}
                  <span className="max-w-[150px] lg:max-w-none truncate">{suggestion.text}</span>
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
          
          {/* Container centralizado para as mensagens - responsivo */}
          <div className="absolute top-20 left-0 lg:left-64 right-0 flex justify-center pointer-events-none z-10 pt-8 px-4 lg:px-0">
            <div className="w-full max-w-lg lg:w-[600px] max-h-[75vh] pointer-events-none">
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
                  <div className={`max-w-[300px] lg:max-w-[400px] px-4 lg:px-5 py-3 lg:py-4 rounded-xl shadow-lg backdrop-blur-sm ${
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