// Sugestões contextuais específicas para cada módulo
// Baseado no PRD - Seção 6.3 "Padrões Agênticos por Módulo"

export interface ContextualSuggestion {
  id: string;
  text: string;
  category: 'acao' | 'pergunta' | 'analise';
  priority?: 'alta' | 'media' | 'baixa';
}

export const contextualSuggestions: { [key: string]: ContextualSuggestion[] } = {
  // Home - Sugestões gerais (já implementadas)
  '/': [
    { id: 'home-1', text: 'Como estão minhas vendas este mês?', category: 'pergunta' },
    { id: 'home-2', text: 'Cadastre um novo paciente', category: 'acao' },
    { id: 'home-3', text: 'Agende uma consulta', category: 'acao' },
  ],

  // Agenda - Sugestões específicas para agendamento
  '/agenda': [
    { id: 'agenda-1', text: 'Remarque a consulta de Maria para próxima semana', category: 'acao', priority: 'alta' },
    { id: 'agenda-2', text: 'Ver meus horários livres nesta semana', category: 'pergunta', priority: 'alta' },
    { id: 'agenda-3', text: 'Encontrar próximo slot disponível para João', category: 'acao', priority: 'media' },
    { id: 'agenda-4', text: 'Transformar esta consulta em retorno recorrente', category: 'acao', priority: 'media' },
    { id: 'agenda-5', text: 'Criar agendamento para limpeza na terça às 14h', category: 'acao', priority: 'baixa' },
  ],

  // Pacientes - Sugestões específicas para gestão de pacientes
  '/pacientes': [
    { id: 'pacientes-1', text: 'Quem não voltou desde abril?', category: 'pergunta', priority: 'alta' },
    { id: 'pacientes-2', text: 'Cadastrar novo paciente com dados básicos', category: 'acao', priority: 'alta' },
    { id: 'pacientes-3', text: 'Atualizar dados de contato da Maria Silva', category: 'acao', priority: 'media' },
    { id: 'pacientes-4', text: 'Listar pacientes inativos dos últimos 6 meses', category: 'analise', priority: 'media' },
    { id: 'pacientes-5', text: 'Enviar lembrete de retorno para pacientes em atraso', category: 'acao', priority: 'baixa' },
  ],

  // Orçamentos - Sugestões específicas para gestão do funil de vendas
  '/orcamentos': [
    { id: 'orcamentos-1', text: 'Criar orçamento para implante + coroa da Maria', category: 'acao', priority: 'alta' },
    { id: 'orcamentos-2', text: 'Quais orçamentos estão próximos do vencimento?', category: 'pergunta', priority: 'alta' },
    { id: 'orcamentos-3', text: 'Aprovar orçamento de R$ 3.200 do João Santos', category: 'acao', priority: 'media' },
    { id: 'orcamentos-4', text: 'Analisar taxa de conversão por procedimento', category: 'analise', priority: 'media' },
    { id: 'orcamentos-5', text: 'Enviar lembrete sobre orçamento pendente', category: 'acao', priority: 'baixa' },
  ],

  // Financeiro - Sugestões específicas para gestão financeira
  '/financeiro': [
    { id: 'financeiro-1', text: 'Conciliar transações bancárias do dia', category: 'acao', priority: 'alta' },
    { id: 'financeiro-2', text: 'Qual o faturamento da semana passada?', category: 'pergunta', priority: 'alta' },
    { id: 'financeiro-3', text: 'Registrar pagamento de R$ 350 da consulta de João', category: 'acao', priority: 'media' },
    { id: 'financeiro-4', text: 'Gerar relatório de inadimplentes', category: 'analise', priority: 'media' },
    { id: 'financeiro-5', text: 'Emitir recibo para o pagamento de Maria', category: 'acao', priority: 'baixa' },
  ],

  // Estoque - Sugestões específicas para gestão de estoque
  '/estoque': [
    { id: 'estoque-1', text: 'Repor anestésicos - estoque baixo', category: 'acao', priority: 'alta' },
    { id: 'estoque-2', text: 'Quais itens estão com estoque baixo?', category: 'pergunta', priority: 'alta' },
    { id: 'estoque-3', text: 'Gerar pedido de compra para fornecedor', category: 'acao', priority: 'media' },
    { id: 'estoque-4', text: 'Atualizar quantidade de luvas em estoque', category: 'acao', priority: 'media' },
    { id: 'estoque-5', text: 'Sugerir quantidades ideais para próximo pedido', category: 'analise', priority: 'baixa' },
  ],

  // Comunicação - Sugestões específicas para CRM e comunicação
  '/comunicacao': [
    { id: 'comunicacao-1', text: 'Enviar WhatsApp para confirmar consultas de amanhã', category: 'acao', priority: 'alta' },
    { id: 'comunicacao-2', text: 'Criar campanha de reativação para inativos', category: 'acao', priority: 'alta' },
    { id: 'comunicacao-3', text: 'Agendar follow-up pós-tratamento para Ana', category: 'acao', priority: 'media' },
    { id: 'comunicacao-4', text: 'Configurar lembrete automático de consultas', category: 'acao', priority: 'media' },
    { id: 'comunicacao-5', text: 'Enviar pesquisa de satisfação para pacientes', category: 'acao', priority: 'baixa' },
  ],

  // Relatórios - Sugestões específicas para análises e relatórios
  '/relatorios': [
    { id: 'relatorios-1', text: 'Explicar por que o faturamento caiu 15% este mês', category: 'analise', priority: 'alta' },
    { id: 'relatorios-2', text: 'Quantos pacientes novos tivemos?', category: 'pergunta', priority: 'alta' },
    { id: 'relatorios-3', text: 'Quebrar faturamento por procedimento', category: 'analise', priority: 'media' },
    { id: 'relatorios-4', text: 'Gerar relatório de performance do mês', category: 'acao', priority: 'media' },
    { id: 'relatorios-5', text: 'Exportar dados para contabilidade', category: 'acao', priority: 'baixa' },
  ],

  // Contábil - Sugestões específicas para gestão fiscal e contábil
  '/contabil': [
    { id: 'contabil-1', text: 'Gerar DAS de dezembro e lembrar vencimento', category: 'acao', priority: 'alta' },
    { id: 'contabil-2', text: 'Organizar documentos para envio ao contador', category: 'acao', priority: 'alta' },
    { id: 'contabil-3', text: 'Qual o valor total de impostos pagos este ano?', category: 'pergunta', priority: 'media' },
    { id: 'contabil-4', text: 'Verificar próximos vencimentos fiscais', category: 'analise', priority: 'media' },
    { id: 'contabil-5', text: 'Exportar relatório para declaração anual', category: 'acao', priority: 'baixa' },
  ],
};

// Função para obter sugestões baseadas no contexto atual
export const getContextualSuggestions = (pathname: string): ContextualSuggestion[] => {
  return contextualSuggestions[pathname] || [];
};

// Função para obter sugestões priorizadas (até 3 sugestões)
export const getPrioritizedSuggestions = (pathname: string, maxSuggestions: number = 3): ContextualSuggestion[] => {
  const suggestions = getContextualSuggestions(pathname);
  
  // Ordena por prioridade (alta > media > baixa)
  const priorityOrder = { 'alta': 3, 'media': 2, 'baixa': 1 };
  
  return suggestions
    .sort((a, b) => {
      const priorityA = priorityOrder[a.priority || 'baixa'];
      const priorityB = priorityOrder[b.priority || 'baixa'];
      return priorityB - priorityA;
    })
    .slice(0, maxSuggestions);
}; 