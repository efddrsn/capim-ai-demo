// Arquivo centralizado de tooltips para o demo da plataforma agêntica CAPIM
// Organizado por seções para facilitar edição e manutenção

export const tooltips = {
  // === HOMEPAGE - CHAT PRINCIPAL ===
  chatInput: "Use linguagem natural para dar comandos. UI generativa aparece com um formulário dinâmico. Ações são agenticas (e.g., 'Rode uma análise de credito de todos pacientes com consulta essa semana')",
  
  // === HOMEPAGE - SUGGESTION PILLS ===
  acoesSuggestions: "Estas ações são sugestões inteligentes que se adaptam aos seus padrões de uso mais frequentes.",
  perguntasSuggestions: "As perguntas mudam com base no contexto da sua operação (ex: performance do mês, pacientes recentes) para antecipar suas necessidades.",
  
  // === HOMEPAGE - JORNADA DE PROFISSIONALIZAÇÃO ===
  proximosPassos: "Esta é a sua jornada para automatizar a clínica. Cada etapa concluída desbloqueia novas capacidades da IA, tornando sua gestão mais inteligente e eficiente.",
  
  // === HOMEPAGE - SEÇÕES DO DIA ===
  acontecendoAgora: "Monitore em tempo real as consultas que estão sendo realizadas no momento. Permite entrada rápida no modo consulta para acompanhar ou ajudar.",
  seuDiaHoje: "Visão consolidada do seu dia: próximos agendamentos e tarefas prioritárias. Mantém você organizado e focado no que importa.",
  
  // Etapa 1: Fundações
  etapa1Fundacoes: "Alimente o sistema com os dados essenciais para a operação dos agentes.",
  ativarAgenteAgendamento: "Princípio Agêntico: Input Flexível. Permita que seus pacientes agendem consultas por texto, como 'quero marcar para terça à tarde', e a IA encontra o melhor horário.",
  cadastrarNovoPaciente: "Princípio Agêntico: Pré-Preenchimento por Contexto. A IA pode usar dados de uma conversa de WhatsApp para preencher 90% do cadastro, restando a você apenas validar.",
  
  // Etapa 2: Otimização do Atendimento
  etapa2Otimizacao: "Automatize tarefas repetitivas da recepção, liberando a equipe para focar no paciente.",
  confirmarConsultasDia: "Princípio Agêntico: Sugestão Proativa. O sistema identifica as consultas do dia e sugere o envio de lembretes, automatizando uma tarefa manual.",
  
  // Etapa 3: Gestão Financeira Inteligente
  etapa3GestaoFinanceira: "Tenha visibilidade e automação sobre o fluxo de caixa e faturamento da clínica.",
  configurarReconciliacaoBancaria: "Princípio Agêntico: Automação Contínua. O agente financeiro trabalha em segundo plano para cruzar pagamentos com agendamentos, eliminando a necessidade de conciliação manual.",
  
  // === OUTRAS PÁGINAS (para expansão futura) ===
  agenda: {
    contextLabel: "Você está visualizando a agenda. O chat pode ajudar com agendamentos, reagendamentos e consultas sobre horários disponíveis.",
    novoAgendamento: "Use linguagem natural como 'agendar Maria para terça 14h' e os campos serão preenchidos automaticamente.",
  },
  
  pacientes: {
    contextLabel: "Você está na lista de pacientes. Pergunte sobre histórico, inadimplência ou crie campanhas de reativação.",
    buscarPaciente: "Digite o nome, telefone ou qualquer informação do paciente para encontrá-lo rapidamente.",
  },

  orcamentos: {
    contextLabel: "Você está no módulo de orçamentos. Gerencie seu funil de vendas, acompanhe conversões e negocie tratamentos.",
    novoOrcamento: "Crie orçamentos detalhados com estimativas de tempo e valor. A IA pode sugerir procedimentos baseados no histórico do paciente.",
    gerenciarFunil: "Acompanhe a jornada de cada orçamento desde a criação até a aprovação. Use as probabilidades para priorizar follow-ups.",
    taxaConversao: "Analise quais tipos de procedimento têm maior taxa de aprovação e otimize sua estratégia comercial.",
  },
  
  financeiro: {
    contextLabel: "Você está no módulo financeiro. Consulte faturamento, fluxo de caixa ou configure reconciliações automáticas.",
    conciliarTransacoes: "A IA cruza automaticamente os pagamentos recebidos com os agendamentos realizados.",
  },

  // === SIDEBAR - BOTÕES DE AÇÃO RÁPIDA ===
  iniciarNovaConsulta: "Inicia um novo atendimento médico em tempo real. Abre o modo consulta para registro de procedimentos, prontuário e cobrança.",
  iniciarNovoAtendimento: "Cria um novo atendimento geral para recepção, orientações ou procedimentos não-médicos. Ideal para triagem e pré-atendimento.",
};

// Tipos para garantir consistência
export type TooltipKey = keyof typeof tooltips;
export type TooltipSection = keyof typeof tooltips.agenda | keyof typeof tooltips.pacientes | keyof typeof tooltips.orcamentos | keyof typeof tooltips.financeiro; 