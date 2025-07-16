export interface ContextualSuggestion {
  text: string;
  category: 'acao' | 'pergunta' | 'analise';
  priority: number;
  contexts: string[];
}

const suggestions: ContextualSuggestion[] = [
  { text: 'Criar nova consulta', category: 'acao', priority: 1, contexts: ['/agenda'] },
  { text: 'Ver pacientes em atraso', category: 'analise', priority: 2, contexts: ['/pacientes'] },
  { text: 'Gerar relatório financeiro', category: 'acao', priority: 3, contexts: ['/financeiro'] }
];

export function getPrioritizedSuggestions(currentPath: string, limit: number = 5): ContextualSuggestion[] {
  return suggestions
    .filter(s => s.contexts.includes(currentPath) || s.contexts.includes('/'))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}