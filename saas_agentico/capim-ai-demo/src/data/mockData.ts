export interface Patient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  lastVisit?: Date;
  status: 'ativo' | 'inativo' | 'pendente';
}

export interface CommandAction {
  id: string;
  name: string;
  description?: string;
  group: 'Criar' | 'Navegar' | 'Buscar' | 'Configurar';
  icon?: string;
  action: () => void;
  keywords?: string[];
  shortcut?: string;
}

// Mock de pacientes
export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    lastVisit: new Date('2024-01-15'),
    status: 'ativo'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 88888-8888',
    lastVisit: new Date('2024-01-20'),
    status: 'ativo'
  },
  {
    id: '3',
    name: 'João Pedro Oliveira',
    email: 'joao.pedro@email.com',
    phone: '(11) 77777-7777',
    lastVisit: new Date('2024-01-10'),
    status: 'ativo'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(11) 66666-6666',
    lastVisit: new Date('2023-12-20'),
    status: 'inativo'
  },
  {
    id: '5',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    phone: '(11) 55555-5555',
    lastVisit: new Date('2024-01-25'),
    status: 'ativo'
  }
];

// Função para simular busca de pacientes
export const searchPatients = (query: string): Patient[] => {
  if (!query || query.length < 2) return [];
  
  const normalizeString = (str: string) => 
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  const normalizedQuery = normalizeString(query);
  
  return mockPatients.filter(patient =>
    normalizeString(patient.name).includes(normalizedQuery)
  ).slice(0, 5); // Limita a 5 resultados
};

// Ações disponíveis no command bar
export const getCommandActions = (navigate: (path: string) => void): CommandAction[] => [
  // Criar
  {
    id: 'novo-agendamento',
    name: 'Novo Agendamento',
    description: 'Criar um novo agendamento',
    group: 'Criar',
    action: () => navigate('/agenda'),
    keywords: ['agendar', 'consulta', 'marcar'],
    shortcut: 'Ctrl+A'
  },
  {
    id: 'novo-paciente',
    name: 'Novo Paciente',
    description: 'Cadastrar novo paciente',
    group: 'Criar',
    action: () => console.log('Abrir modal de novo paciente'),
    keywords: ['cadastrar', 'cliente'],
    shortcut: 'Ctrl+P'
  },
  {
    id: 'novo-orcamento',
    name: 'Novo Orçamento',
    description: 'Criar novo orçamento',
    group: 'Criar',
    action: () => navigate('/orcamentos'),
    keywords: ['orcar', 'preco', 'valor'],
    shortcut: 'Ctrl+O'
  },
  {
    id: 'novo-tratamento',
    name: 'Novo Tratamento',
    description: 'Registrar novo tratamento',
    group: 'Criar',
    action: () => console.log('Abrir modal de novo tratamento'),
    keywords: ['procedimento', 'terapia']
  },
  
  // Navegar
  {
    id: 'ir-agenda',
    name: 'Agenda',
    description: 'Ir para a agenda',
    group: 'Navegar',
    action: () => navigate('/agenda'),
    keywords: ['calendario', 'compromissos']
  },
  {
    id: 'ir-pacientes',
    name: 'Pacientes',
    description: 'Ir para lista de pacientes',
    group: 'Navegar',
    action: () => navigate('/pacientes'),
    keywords: ['clientes', 'pessoas']
  },
  {
    id: 'ir-orcamentos',
    name: 'Orçamentos',
    description: 'Ir para orçamentos',
    group: 'Navegar',
    action: () => navigate('/orcamentos'),
    keywords: ['vendas', 'propostas']
  },
  {
    id: 'ir-financeiro',
    name: 'Financeiro',
    description: 'Ir para módulo financeiro',
    group: 'Navegar',
    action: () => navigate('/financeiro'),
    keywords: ['dinheiro', 'pagamentos', 'faturamento']
  },
  {
    id: 'ir-estoque',
    name: 'Estoque',
    description: 'Ir para controle de estoque',
    group: 'Navegar',
    action: () => navigate('/estoque'),
    keywords: ['produtos', 'materiais', 'inventario']
  },
  
  // Buscar
  {
    id: 'buscar-consultas-hoje',
    name: 'Consultas de Hoje',
    description: 'Ver consultas agendadas para hoje',
    group: 'Buscar',
    action: () => console.log('Filtrar consultas de hoje'),
    keywords: ['hoje', 'agendamentos']
  },
  {
    id: 'buscar-pacientes-atrasados',
    name: 'Pacientes em Atraso',
    description: 'Pacientes com retorno em atraso',
    group: 'Buscar',
    action: () => console.log('Filtrar pacientes atrasados'),
    keywords: ['atraso', 'retorno', 'pendente']
  },
  
  // Configurar
  {
    id: 'configuracoes',
    name: 'Configurações',
    description: 'Abrir configurações do sistema',
    group: 'Configurar',
    action: () => console.log('Abrir configurações'),
    keywords: ['config', 'settings', 'preferencias']
  }
];