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
      '/orcamentos': 'Orçamentos', 
      '/financeiro': 'Financeiro',
      '/estoque': 'Estoque',
      '/comunicacao': 'Comunicação',
      '/relatorios': 'Relatórios',
      '/contabil': 'Contábil',
    };
    
    const context = pathMap[location.pathname];
    return context ? `${context}` : 'CAPIM';
  };

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
      
      setChatState('conversation');
      setMessages(prev => [...prev, userMessage]);
      setNewMessageIds(new Set([userMessage.id]));
      setMessage('');
      
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
    <div className="w-full lg:w-96 bg-white border-l border-gray-200 flex flex-col h-full">
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
              <span className="truncate max-w-[120px] lg:max-w-[100px]">{suggestion.text}</span>
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